export function No() {
    return {
        canContainEols: [
            `delete`
        ],
        enter: {
            strikethrough: Fo
        },
        exit: {
            strikethrough: Io
        }
    };
}
function Fo(e) {
    this.enter({
        type: `delete`,
        children: []
    }, e);
}
function Io(e) {
    this.exit(e);
}
