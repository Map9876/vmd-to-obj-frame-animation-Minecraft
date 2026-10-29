const ee = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
export function te(e) {
    let t = {};
    e.replace(ee, (e)=>{
        let e_length = e.length;
        switch(e[0]){
            case `G`:
                t.era = e_length === 4 ? `long` : e_length === 5 ? `narrow` : `short`;
                break;
            case `y`:
                t.year = e_length === 2 ? `2-digit` : `numeric`;
                break;
            case `Y`:
            case `u`:
            case `U`:
            case `r`:
                throw RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
            case `q`:
            case `Q`:
                throw RangeError("`q/Q` (quarter) patterns are not supported");
            case `M`:
            case `L`:
                t.month = [
                    `numeric`,
                    `2-digit`,
                    `short`,
                    `long`,
                    `narrow`
                ][e_length - 1];
                break;
            case `w`:
            case `W`:
                throw RangeError("`w/W` (week) patterns are not supported");
            case `d`:
                t.day = [
                    `numeric`,
                    `2-digit`
                ][e_length - 1];
                break;
            case `D`:
            case `F`:
            case `g`:
                throw RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
            case `E`:
                t.weekday = e_length === 4 ? `long` : e_length === 5 ? `narrow` : `short`;
                break;
            case `e`:
                if (e_length < 4) {
                    throw RangeError("`e..eee` (weekday) patterns are not supported");
                }
                t.weekday = [
                    `short`,
                    `long`,
                    `narrow`,
                    `short`
                ][e_length - 3];
                break;
            case `c`:
                if (e_length < 4) {
                    throw RangeError("`c..ccc` (weekday) patterns are not supported");
                }
                t.weekday = [
                    `short`,
                    `long`,
                    `narrow`,
                    `short`
                ][e_length - 3];
                break;
            case `a`:
                t.hour12 = true;
                break;
            case `b`:
            case `B`:
                throw RangeError("`b/B` (period) patterns are not supported, use `a` instead");
            case `h`:
                t.hourCycle = `h12`;
                t.hour = [
                    `numeric`,
                    `2-digit`
                ][e_length - 1];
                break;
            case `H`:
                t.hourCycle = `h23`;
                t.hour = [
                    `numeric`,
                    `2-digit`
                ][e_length - 1];
                break;
            case `K`:
                t.hourCycle = `h11`;
                t.hour = [
                    `numeric`,
                    `2-digit`
                ][e_length - 1];
                break;
            case `k`:
                t.hourCycle = `h24`;
                t.hour = [
                    `numeric`,
                    `2-digit`
                ][e_length - 1];
                break;
            case `j`:
            case `J`:
            case `C`:
                throw RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
            case `m`:
                t.minute = [
                    `numeric`,
                    `2-digit`
                ][e_length - 1];
                break;
            case `s`:
                t.second = [
                    `numeric`,
                    `2-digit`
                ][e_length - 1];
                break;
            case `S`:
            case `A`:
                throw RangeError("`S/A` (second) patterns are not supported, use `s` instead");
            case `z`:
                t.timeZoneName = e_length < 4 ? `short` : `long`;
                break;
            case `Z`:
            case `O`:
            case `v`:
            case `V`:
            case `X`:
            case `x`:
                throw RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
        }
        return ``;
    });
    return t;
}
