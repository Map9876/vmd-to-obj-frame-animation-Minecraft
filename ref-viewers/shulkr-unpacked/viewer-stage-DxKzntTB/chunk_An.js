export function An(e) {
    if (!e || typeof e != `object`) {
        return {};
    }
    let e_entity = e.entity;
    if (!e_entity || typeof e_entity != `object`) {
        return {};
    }
    let n = e_entity;
    return {
        id: typeof n.id == `string` ? n.id : undefined,
        name: jn(n.CustomName)
    };
}
function jn(CustomName) {
    if (!(typeof CustomName != `string` || CustomName === ``)) {
        try {
            let t = JSON.parse(CustomName);
            if (typeof t == `string`) {
                return t;
            }
            if (t && typeof t == `object` && typeof t.text == `string`) {
                return t.text;
            }
        } catch  {}
        return CustomName;
    }
}
