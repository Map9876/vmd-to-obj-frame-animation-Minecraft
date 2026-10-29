export function qs() {
    return {
        exit: {
            taskListCheckValueChecked: Ys,
            taskListCheckValueUnchecked: Ys,
            paragraph
        }
    };
}
function Ys(e) {
    let t = this.stack[this.stack.length - 2];
    t.type;
    t.checked = e.type === `taskListCheckValueChecked`;
}
function paragraph(e) {
    let t = this.stack[this.stack.length - 2];
    if (t && t.type === `listItem` && typeof t.checked == `boolean`) {
        let e = this.stack[this.stack.length - 1];
        e.type;
        let n = e.children[0];
        if (n && n.type === `text`) {
            let r = t.children;
            let i = -1;
            let a;
            while(++i < r.length){
                let e = r[i];
                if (e.type === `paragraph`) {
                    a = e;
                    break;
                }
            }
            if (a === e) {
                n.value = n.value.slice(1);
                if (n.value.length === 0) {
                    e.children.shift();
                } else if (e.position && n.position && typeof n.position.start.offset == `number`) {
                    n.position.start.column++;
                    n.position.start.offset++;
                    e.position.start = {
                        ...n.position.start
                    };
                }
            }
        }
    }
    this.exit(e);
}
