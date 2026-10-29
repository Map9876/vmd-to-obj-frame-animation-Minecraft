export default function(e) {
    try {
        return Function.toString.call(e).indexOf("[native code]") !== -1;
    } catch (t) {
        return typeof e === "function";
    }
};
