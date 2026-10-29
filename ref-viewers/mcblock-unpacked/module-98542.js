let i = null;
export function q() {
    let at = Date.now();
    if (i && at - i.at < 60000) {
        return i.promise;
    }
    let promise = fetch("/api/site-messages/active").then(async (e)=>{
        if (!e.ok) {
            return null;
        }
        let i = await e.json();
        let a = i.banner !== undefined || i.popup !== undefined ? i : i.data;
        if (a) {
            return {
                banner: a.banner ?? null,
                popup: a.popup ?? null
            };
        }
        return null;
    }).catch(()=>null);
    let n = {
        at,
        promise
    };
    i = n;
    promise.then((e)=>{
        if (!(e || i !== n)) {
            i = null;
        }
    });
    return promise;
}
