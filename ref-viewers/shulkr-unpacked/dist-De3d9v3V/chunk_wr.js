const wr = {
    4280098081: `black`,
    4289736230: `red`,
    4284382230: `green`,
    4286796850: `brown`,
    4282139818: `blue`,
    4287181496: `purple`,
    4279671964: `cyan`,
    4288519575: `light_gray`,
    4282863442: `gray`,
    4294151082: `pink`,
    4286629663: `lime`,
    4294891581: `yellow`,
    4282037210: `light_blue`,
    4291251901: `magenta`,
    4294541341: `orange`,
    4294574078: `white`
};
export function Tr(e) {
    if (typeof e == `number`) {
        return wr[e >>> 0] ?? `black`;
    }
    return `black`;
}
