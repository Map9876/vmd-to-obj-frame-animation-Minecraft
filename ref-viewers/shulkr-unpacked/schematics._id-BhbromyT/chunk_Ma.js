function Ma(e) {
    return function(t) {
        return [
            ...arguments
        ].slice(1).reduce((acc, item)=>{
            let r = Object.entries(item);
            for (let [n, i] of r){
                let r = acc[n];
                if (r != null) {
                    acc[n] = r + e * i;
                }
            }
            return acc;
        }, {
            ...t
        });
    };
}
export const Na = Ma(1);
export const Pa = Ma(-1);
