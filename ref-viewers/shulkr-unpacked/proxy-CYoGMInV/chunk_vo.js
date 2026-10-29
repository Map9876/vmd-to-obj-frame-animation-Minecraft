function vo(isActive = false) {
    return {
        isActive,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    };
}
export function yo() {
    return {
        animate: vo(true),
        whileInView: vo(),
        whileHover: vo(),
        whileTap: vo(),
        whileDrag: vo(),
        whileFocus: vo(),
        exit: vo()
    };
}
