import { Ic as toXYZ, Lc as fromXYZ } from "./chunk_kc.js";
import { rc } from "./chunk_$s.js";
import { Gs as transfer, Hs, Us as workingColorSpace, Ws as transfer_1 } from "./chunk_go.js";
import { zc } from "./chunk_fc.js";
function Rc() {
    let e = {
        enabled: true,
        workingColorSpace,
        spaces: {},
        convert: function(e, t, n) {
            if (this.enabled === false || t === n || !t || !n) {
                return e;
            }
            if (this.spaces[t].transfer === `srgb`) {
                e.r = zc(e.r);
                e.g = zc(e.g);
                e.b = zc(e.b);
            }
            if (this.spaces[t].primaries !== this.spaces[n].primaries) {
                e.applyMatrix3(this.spaces[t].toXYZ);
                e.applyMatrix3(this.spaces[n].fromXYZ);
            }
            if (this.spaces[n].transfer === `srgb`) {
                e.r = Bc(e.r);
                e.g = Bc(e.g);
                e.b = Bc(e.b);
            }
            return e;
        },
        workingToColorSpace: function(e, t) {
            return this.convert(e, this.workingColorSpace, t);
        },
        colorSpaceToWorking: function(e, t) {
            return this.convert(e, t, this.workingColorSpace);
        },
        getPrimaries: function(e) {
            return this.spaces[e].primaries;
        },
        getTransfer: function(e) {
            if (e === ``) {
                return transfer_1;
            }
            return this.spaces[e].transfer;
        },
        getToneMappingMode: function(e) {
            return this.spaces[e].outputColorSpaceConfig.toneMappingMode || `standard`;
        },
        getLuminanceCoefficients: function(e, t = this.workingColorSpace) {
            return e.fromArray(this.spaces[t].luminanceCoefficients);
        },
        define: function(e) {
            Object.assign(this.spaces, e);
        },
        _getMatrix: function(e, t, n) {
            return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ);
        },
        _getDrawingBufferColorSpace: function(e) {
            return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
        },
        _getUnpackColorSpace: function(e = this.workingColorSpace) {
            return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
        },
        fromWorkingColorSpace: function(t, n) {
            rc(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`);
            return e.workingToColorSpace(t, n);
        },
        toWorkingColorSpace: function(t, n) {
            rc(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`);
            return e.colorSpaceToWorking(t, n);
        }
    };
    let primaries = [
        0.64,
        0.33,
        0.3,
        0.6,
        0.15,
        0.06
    ];
    let luminanceCoefficients = [
        0.2126,
        0.7152,
        0.0722
    ];
    let whitePoint = [
        0.3127,
        0.329
    ];
    e.define({
        [workingColorSpace]: {
            primaries,
            whitePoint,
            transfer: transfer_1,
            toXYZ,
            fromXYZ,
            luminanceCoefficients,
            workingColorSpaceConfig: {
                unpackColorSpace: Hs
            },
            outputColorSpaceConfig: {
                drawingBufferColorSpace: Hs
            }
        },
        [Hs]: {
            primaries,
            whitePoint,
            transfer,
            toXYZ,
            fromXYZ,
            luminanceCoefficients,
            outputColorSpaceConfig: {
                drawingBufferColorSpace: Hs
            }
        }
    });
    return e;
}
export const q = Rc();
export function Bc(e) {
    if (e < 0.0031308) {
        return e * 12.92;
    }
    return 1.055 * e ** 0.41666 - 0.055;
}
