export default function(e) {
    if (e === undefined) {
        throw ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return e;
};
