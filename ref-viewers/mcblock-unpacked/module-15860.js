let r;
export function HandleISRError({ error }) {
    if (r) {
        let e = r.getStore();
        if (e?.isRevalidate || e?.isStaticGeneration) {
            console.error(error);
            throw error;
        }
    }
    return null;
}
