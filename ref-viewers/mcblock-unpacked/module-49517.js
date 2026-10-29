import { s5, sA } from "./module-96185.js";
import "./module-9387.js";
export class Vc {
    static MODULUS_BITS = 48;
    static MODULUS_MASK = BigInt("281474976710655");
    static MULTIPLIER = BigInt("25214903917");
    static INCREMENT = BigInt("11");
    static FLOAT_MULTIPLIER = 1 / 16777216;
    static DOUBLE_MULTIPLIER = 1 / 1073741824;
    seed = BigInt(0);
    constructor(e){
        this.setSeed(e);
    }
    static fromLargeFeatureSeed(e, t, r) {
        let s = new Vc(e);
        let i = s.nextLong();
        let a = s.nextLong();
        let o = BigInt(t) * i ^ BigInt(r) * a ^ e;
        s.setSeed(o);
        return s;
    }
    static fromLargeFeatureWithSalt(e, t, r, s) {
        return new Vc(BigInt(t) * BigInt("341873128712") + BigInt(r) * BigInt("132897987541") + e + BigInt(s));
    }
    fork() {
        return new Vc(this.nextLong());
    }
    forkPositional() {
        return new i(this.nextLong());
    }
    setSeed(e) {
        this.seed = (e ^ Vc.MULTIPLIER) & Vc.MODULUS_MASK;
    }
    advance() {
        this.seed = this.seed * Vc.MULTIPLIER + Vc.INCREMENT & Vc.MODULUS_MASK;
    }
    consume(e) {
        for(let t = 0; t < e; t += 1){
            this.advance();
        }
    }
    next(e) {
        this.advance();
        let t = Number(this.seed >> BigInt(Vc.MODULUS_BITS - e));
        if (t > 2147483647) {
            return t - 4294967296;
        }
        return t;
    }
    nextInt(e) {
        let t;
        let r;
        if (e === undefined) {
            return this.next(32);
        }
        if ((e & e - 1) == 0) {
            return Number(BigInt(e) * BigInt(this.next(31)) >> BigInt(31));
        }
        while((t = this.next(31)) - (r = t % e) + (e - 1) < 0);
        return r;
    }
    nextLong() {
        return (BigInt(this.next(32)) << BigInt(32)) + BigInt(this.next(32));
    }
    nextFloat() {
        return this.next(24) * Vc.FLOAT_MULTIPLIER;
    }
    nextDouble() {
        let e = this.next(30);
        this.advance();
        return e * Vc.DOUBLE_MULTIPLIER;
    }
}
class i {
    seed;
    constructor(e){
        this.seed = e;
    }
    at(e, t, r) {
        return new Vc(sA(e, t, r) ^ this.seed);
    }
    fromHashOf(e) {
        return new Vc(BigInt(s5(e)) ^ this.seed);
    }
    seedKey() {
        return [
            this.seed,
            BigInt(0)
        ];
    }
}
class a {
    static SILVER_RATIO_64 = BigInt("7640891576956012809");
    static GOLDEN_RATIO_64 = BigInt("-7046029254386353131");
    static FLOAT_MULTIPLIER = 1 / 16777216;
    static DOUBLE_MULTIPLIER = 1.1102230246251565e-16;
    static BIGINT_1 = BigInt(1);
    static BIGINT_17 = BigInt(17);
    static BIGINT_21 = BigInt(21);
    static BIGINT_27 = BigInt(27);
    static BIGINT_28 = BigInt(28);
    static BIGINT_30 = BigInt(30);
    static BIGINT_31 = BigInt(31);
    static BIGINT_32 = BigInt(32);
    static BIGINT_49 = BigInt(49);
    static BIGINT_64 = BigInt(64);
    static STAFFORD_1 = BigInt("-4658895280553007687");
    static STAFFORD_2 = BigInt("-7723592293110705685");
    static MAX_ULONG = BigInt("0xFFFFFFFFFFFFFFFF");
    static POW2_60 = BigInt("0x10000000000000000");
    static POW2_63 = BigInt("0x8000000000000000");
    static MAX_UINT = BigInt(4294967295);
    seed = [
        BigInt(0),
        BigInt(0)
    ];
    constructor(e){
        this.seed = e;
    }
    static create(e) {
        return new a(a.upgradeSeedTo128bit(e));
    }
    static mixStafford13(e) {
        return ((e = ((e = (e ^ e >> a.BIGINT_30) * a.STAFFORD_1 & a.MAX_ULONG) ^ e >> a.BIGINT_27) * a.STAFFORD_2 & a.MAX_ULONG) ^ e >> a.BIGINT_31) & a.MAX_ULONG;
    }
    static upgradeSeedTo128bit(e) {
        if (e < 0) {
            e += a.POW2_60;
        }
        let t = e ^ a.SILVER_RATIO_64;
        let r = t + a.GOLDEN_RATIO_64 & a.MAX_ULONG;
        return [
            a.mixStafford13(t),
            a.mixStafford13(r)
        ];
    }
    static rotateLeft(e, t) {
        return e << t & a.MAX_ULONG | e >> a.BIGINT_64 - t;
    }
    setSeed(e) {
        this.seed = a.upgradeSeedTo128bit(e);
    }
    fork() {
        return new a([
            this.next(),
            this.next()
        ]);
    }
    forkPositional() {
        return new XoroshiroPositionalRandom(this.next(), this.next());
    }
    next() {
        let e = this.seed[0];
        let t = this.seed[1];
        let r = a.rotateLeft(e + t & a.MAX_ULONG, a.BIGINT_17) + e & a.MAX_ULONG;
        t ^= e;
        this.seed = [
            a.rotateLeft(e, a.BIGINT_49) ^ t ^ t << a.BIGINT_21 & a.MAX_ULONG,
            a.rotateLeft(t, a.BIGINT_28)
        ];
        return r;
    }
    nextLong() {
        let e = this.next();
        if (e > a.POW2_63) {
            e -= a.POW2_60;
        }
        return e;
    }
    consume(e) {
        let t = this.seed[0];
        let r = this.seed[1];
        for(let s = 0; s < e; s += 1){
            r ^= t;
            t = a.rotateLeft(t, a.BIGINT_49) ^ r ^ r << a.BIGINT_21;
            r = a.rotateLeft(r, a.BIGINT_28);
        }
        this.seed = [
            t,
            r
        ];
    }
    nextBits(e) {
        return this.next() >> BigInt(64 - e);
    }
    nextInt(e) {
        let t = this.next() & a.MAX_UINT;
        if (e) {
            let r = BigInt(e);
            let s = t * r;
            let n = s & a.MAX_UINT;
            if (n < r) {
                let e = ((~r & a.MAX_UINT) + a.BIGINT_1) % r;
                while(n < e){
                    n = (s = (t = this.next() & a.MAX_UINT) * r) & a.MAX_UINT;
                }
            }
            return Number(s >> a.BIGINT_32);
        }
        {
            let e = Number(t);
            if (e >= 2147483648) {
                e -= 4294967296;
            }
            return e;
        }
    }
    nextFloat() {
        return Number(this.nextBits(24)) * a.FLOAT_MULTIPLIER;
    }
    nextDouble() {
        return Number(this.nextBits(53)) * a.DOUBLE_MULTIPLIER;
    }
    parityConfigString() {
        return `seedLo: ${this.seed[0]}, seedHi: ${this.seed[1]}`;
    }
}
