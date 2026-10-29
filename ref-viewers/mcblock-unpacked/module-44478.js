let a = {
    easy: "beginner",
    beginner: "beginner",
    medium: "intermediate",
    intermediate: "intermediate",
    hard: "advanced",
    advanced: "advanced",
    expert: "expert"
};
let n = {
    beginner: {
        key: "beginner",
        label: "新手",
        bg: "var(--color-brand-primary)",
        fg: "#0B1503"
    },
    intermediate: {
        key: "intermediate",
        label: "进阶",
        bg: "var(--color-warning)",
        fg: "#0B1503"
    },
    advanced: {
        key: "advanced",
        label: "高级",
        bg: "var(--color-error)",
        fg: "#FFFFFF"
    },
    expert: {
        key: "expert",
        label: "大师",
        bg: "var(--color-difficulty-expert)",
        fg: "#FFFFFF"
    }
};
export function g(e) {
    return n[a[e ?? ""] ?? "beginner"];
}
