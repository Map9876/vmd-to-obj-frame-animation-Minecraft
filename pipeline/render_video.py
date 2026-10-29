import os, sys, json, argparse
import numpy as np
from PIL import Image, ImageDraw

def make_cube_sprite(base, top_f, left_f, right_f, W, H, Z):
    img = Image.new('RGBA', (W, H + Z), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    def shade(c, f):
        return tuple(max(0, min(255, int(v * f))) for v in c)
    top = [(W // 2, 0), (W, H // 2), (W // 2, H), (0, H // 2)]
    left = [(0, H // 2), (W // 2, H), (W // 2, H + Z), (0, H // 2 + Z)]
    right = [(W // 2, H), (W, H // 2), (W, H // 2 + Z), (W // 2, H + Z)]
    d.polygon(top, fill=shade(base, top_f) + (255,))
    d.polygon(left, fill=shade(base, left_f) + (255,))
    d.polygon(right, fill=shade(base, right_f) + (255,))
    return img

def render_frame(grid, base=(0xC8, 0xC2, 0xB6), W=10, H=5, Z=5, bg=(18, 22, 34)):
    N = grid.shape[0]
    sprite = make_cube_sprite(base, 1.0, 0.78, 0.58, W, H, Z)
    sw, sh = sprite.size
    max_x = (N - 1) * (W // 2)
    max_y = (N - 1) * (H // 2) + (N - 1) * Z
    cw = max_x * 2 + sw + 8
    ch = max_y + sh + 8
    canvas = Image.new('RGB', (cw, ch), bg)
    ox = max_x + sw // 2 + 4
    oy = max_y - (N - 1) * Z + sh // 2 + 4
    coords = np.argwhere(grid > 0)
    coords = coords[np.argsort(coords.sum(axis=1))]
    for (x, y, z) in coords:
        px = ox + (x - y) * (W // 2)
        py = oy + (x + y) * (H // 2) - z * Z
        canvas.paste(sprite, (int(px - sw // 2), int(py - sh // 2)), sprite)
    return canvas

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--vox', required=True, help='frames_vox dir')
    ap.add_argument('--out', default='out.mp4')
    ap.add_argument('--fps', type=int, default=24)
    ap.add_argument('--pngdir', default=None)
    ap.add_argument('--size', type=int, default=0)
    a = ap.parse_args()
    data = np.load(os.path.join(a.vox, 'frames.npz'))
    stack = data['grid']
    F = stack.shape[0]
    pngdir = a.pngdir or (a.vox + '_png')
    os.makedirs(pngdir, exist_ok=True)
    for i in range(F):
        img = render_frame(stack[i], W=10, H=5, Z=5)
        if a.size:
            img = img.resize((a.size, a.size), Image.NEAREST)
        p = os.path.join(pngdir, 'f_%05d.png' % (i + 1))
        img.save(p)
    pattern = os.path.join(pngdir, 'f_%05d.png')
    cmd = 'ffmpeg -y -framerate %d -i %s -c:v libx264 -pix_fmt yuv420p -crf 18 %s' % (a.fps, pattern, a.out)
    print('running:', cmd)
    os.system(cmd)
    print('DONE video ->', a.out, '(%d frames)' % F)

if __name__ == '__main__':
    main()
