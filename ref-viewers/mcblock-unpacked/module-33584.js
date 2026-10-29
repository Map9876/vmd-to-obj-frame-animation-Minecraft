import n from "./module-88634.js";
export default function(e, t, r, o, a) {
    const u = n(e, t, r, o, a);
    return u.next().then((e)=>{
        if (e.done) {
            return e.value;
        }
        return u.next();
    });
};
