let i = JSON.parse('{"rE":"minecraft-data-dd01127457231e7da629d645b3c6738068018eb0","D8":{"6":"1.7.4","7":"1.7.5","10":"1.7.6","11":"1.7.7","12":"1.7.8","13":"1.7.9","18":"1.7.10","74":"1.8","80":"1.8.1","88":"1.8.2","89":"1.8.3","90":"1.8.4","91":"1.8.5","92":"1.8.6","93":"1.8.7","94":"1.8.8","95":"1.8.9","169":"1.9","175":"1.9.1","176":"1.9.2","183":"1.9.3","184":"1.9.4","510":"1.10","511":"1.10.1","512":"1.10.2","819":"1.11","921":"1.11.1","922":"1.11.2","1139":"1.12","1241":"1.12.1","1343":"1.12.2","1519":"1.13","1628":"1.13.1","1631":"1.13.2","1952":"1.14","1957":"1.14.1","1963":"1.14.2","1968":"1.14.3","1976":"1.14.4","2225":"1.15","2227":"1.15.1","2230":"1.15.2","2566":"1.16","2567":"1.16.1","2578":"1.16.2","2580":"1.16.3","2584":"1.16.4","2586":"1.16.5","2724":"1.17","2730":"1.17.1","2860":"1.18","2865":"1.18.1","2975":"1.18.2","3105":"1.19","3117":"1.19.1","3120":"1.19.2","3218":"1.19.3","3337":"1.19.4","3463":"1.20","3465":"1.20.1","3578":"1.20.2","3698":"1.20.3","3700":"1.20.4","3837":"1.20.5","3839":"1.20.6","3953":"1.21","3955":"1.21.1","4080":"1.21.2","4082":"1.21.3","4189":"1.21.4","4325":"1.21.5","4435":"1.21.6","4438":"1.21.7","4440":"1.21.8","4554":"1.21.9","4556":"1.21.10","4671":"1.21.11","4786":"26.1","4788":"26.1.1","4790":"26.1.2","4903":"26.2","5023":"26.3"}}');
let r = i.rE;
export function tk(e, t = []) {
    return {
        ...Object.fromEntries([
            ...new Set([
                ...Object.keys(e),
                ...t
            ])
        ].filter((e)=>e !== "unknown").sort((e, t)=>t.localeCompare(e, "en", {
                numeric: true
            })).map((e)=>[
                e,
                `${e}.x`
            ])),
        unknown: "版本未知"
    };
}
export function M6(e, t, s) {
    if (!e || typeof e !== "object" || !t || !s) {
        return null;
    }
    let e_projectionVersion = e.projectionVersion;
    if (e_projectionVersion && typeof e_projectionVersion === "object" && !e_projectionVersion.needsReview && e_projectionVersion.status === "identified" && e_projectionVersion.projectionUrl === t && e_projectionVersion.projectionSha256 === s && e_projectionVersion.mappingVersion === r) {
        let e = ((e)=>{
            if (!Number.isSafeInteger(e) || Number(e) <= 0) {
                return null;
            }
            let t = i.D8;
            if (Object.hasOwn(t, String(e))) {
                return t[String(e)];
            }
            return null;
        })(e_projectionVersion.dataVersion);
        if (e !== null && e === e_projectionVersion.exactVersion) {
            return e;
        }
    }
    let e_versionClassification = e.versionClassification;
    if (e_versionClassification && typeof e_versionClassification === "object" && e_versionClassification.needsReview === false && e_versionClassification.source === "user_assigned" && e_versionClassification.authorization === "user_confirmed_workbench" && e_versionClassification.projectionUrl === t && e_versionClassification.projectionSha256 === s && e_versionClassification.sourceSha256 === s && typeof e_versionClassification.family === "string" && /^\d{1,2}\.\d{1,2}$/.test(e_versionClassification.family)) {
        return e_versionClassification.family;
    }
    return null;
}
