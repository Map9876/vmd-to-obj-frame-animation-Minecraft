import { n } from "../schemas-Y3Thg5L-.js";
import { _ } from "../dist-C66QuM2X.js";
export const k = {
    litematic: {
        extension: `litematic`,
        edition: `java`,
        limit: {
            maxBlockCount: 10000000,
            maxVolume: 100000000
        }
    },
    schem: {
        extension: `schem`,
        edition: `java`,
        limit: {
            maxBlockCount: 10000000,
            maxVolume: 100000000
        }
    },
    nbt: {
        extension: `nbt`,
        edition: `java`,
        limit: {
            maxBlockCount: 10000000,
            maxVolume: 100000000
        }
    },
    mcstructure: {
        extension: `mcstructure`,
        edition: `bedrock`,
        limit: {
            maxBlockCount: 10000000,
            maxVolume: 16000000
        }
    }
};
export const _e = n(_).options;
export const ve = Object.fromEntries(_.map((e)=>[
        e,
        k[e].extension
    ]));
export function ye(e) {
    return k[e].edition;
}
export const be = _.map((e)=>`.${k[e].extension}`);
export const xe = Object.fromEntries(_.map((e)=>[
        e,
        k[e].limit
    ]));
