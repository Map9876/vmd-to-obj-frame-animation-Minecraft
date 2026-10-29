const O = {
    windows: `\\`,
    macos: `/`,
    linux: `/`
};
const k = {
    official: {
        windows: `%APPDATA%\\.minecraft`,
        macos: `~/Library/Application Support/minecraft`,
        linux: `~/.minecraft`
    },
    modrinth: {
        windows: `%APPDATA%\\ModrinthApp\\profiles\\<instance>`,
        macos: `~/Library/Application Support/ModrinthApp/profiles/<instance>`,
        linux: `~/.local/share/ModrinthApp/profiles/<instance>`
    },
    curseforge: {
        windows: null,
        macos: null,
        linux: null
    },
    prism: {
        windows: `%APPDATA%\\PrismLauncher\\instances\\<instance>\\minecraft`,
        macos: `~/Library/Application Support/PrismLauncher/instances/<instance>/minecraft`,
        linux: `~/.local/share/PrismLauncher/instances/<instance>/minecraft`
    }
};
const A = {
    gameDir: [],
    mods: [
        `mods`
    ],
    litematicaSchematics: [
        `schematics`
    ],
    createSchematics: [
        `schematics`
    ],
    worldeditSchematics: [
        `config`,
        `worldedit`,
        `schematics`
    ],
    saves: [
        `saves`
    ]
};
export function j(e, t, n, r = []) {
    let i = k[n][t];
    if (i === null) {
        return null;
    }
    return [
        i,
        ...A[e],
        ...r
    ].join(O[t]);
}
