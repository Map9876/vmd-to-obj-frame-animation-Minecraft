const fs = require('fs');
const OUT = '/workspace/mc-voxel-video/schematics';
const off = JSON.parse(fs.readFileSync(OUT + '/offsets.json', 'utf8'));
const frames = off.frames;
const cy = Math.floor(80 / 2); // figure vertical center (all frames 80 tall)

// ---- DOLLY: glide past all 30 frozen poses, looking at each frame center ----
// Camera sits on +Z side, same height as the figure, moves along +X.
const D = 42;            // viewing distance in front of the row
const dt = 0.45;         // seconds spent per pose (slow = bullet-time feel)
const dolly = {
  name: 'dance_dolly',
  type: 'dolly_past_all_frames',
  description: 'Camera glides along +X in front of each frozen pose. Slow pace -> bullet-time. Tilt-shift/DOF in ReplayMod post for the miniature look.',
  keyframes: []
};
for (let i = 0; i < frames.length; i++) {
  const c = frames[i].center;
  dolly.keyframes.push({
    t: +(i * dt).toFixed(3),
    pos: [c.x, cy, c.z + D],
    look: [c.x, cy, c.z],
    fov: 55,
    roll: 0
  });
}
dolly.duration = +((frames.length - 1) * dt).toFixed(3);

// ---- RING-SHOT: 360 orbit around one hero pose (frame 15) ----
const hero = frames[14].center;
const R = 52;
const T = 12;            // seconds for full loop
const steps = 48;
const ring = {
  name: 'hero_ring',
  type: 'orbit_single_frame',
  target_frame: frames[14].frame,
  target_center: [hero.x, cy, hero.z],
  radius: R,
  description: 'Full 360 orbit around frame 15 (a hero pose). Use ReplayMod slow-mo for the ring-shot.',
  keyframes: []
};
for (let i = 0; i <= steps; i++) {
  const th = (i / steps) * Math.PI * 2;
  ring.keyframes.push({
    t: +(i / steps * T).toFixed(3),
    pos: [hero.x + R * Math.cos(th), cy + 6, hero.z + R * Math.sin(th)],
    look: [hero.x, cy, hero.z],
    fov: 50,
    roll: 0
  });
}
ring.duration = T;

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(OUT + '/camera_dolly.json', JSON.stringify(dolly, null, 2));
fs.writeFileSync(OUT + '/camera_ring.json', JSON.stringify(ring, null, 2));
console.log('Wrote camera_dolly.json:', dolly.keyframes.length, 'keyframes, duration', dolly.duration, 's');
console.log('Wrote camera_ring.json:', ring.keyframes.length, 'keyframes, duration', ring.duration, 's');
console.log('Hero (frame 15) center:', [hero.x, cy, hero.z]);
