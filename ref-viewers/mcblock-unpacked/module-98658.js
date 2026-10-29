export let D = {
    launch: "上新",
    update: "新功能",
    fix: "修复",
    notice: "通知",
    event: "活动",
    maintenance: "维护"
};
export let EZ = {
    launch: "步骤教学上新",
    update: "新功能",
    fix: "修复",
    notice: "通知",
    event: "活动",
    maintenance: "维护"
};
export let DM = {
    launch: {
        inInbox: true,
        inPopup: true,
        inBanner: false,
        inChangelog: false
    },
    update: {
        inInbox: true,
        inPopup: true,
        inBanner: false,
        inChangelog: true
    },
    fix: {
        inInbox: false,
        inPopup: false,
        inBanner: false,
        inChangelog: true
    },
    notice: {
        inInbox: true,
        inPopup: true,
        inBanner: false,
        inChangelog: false
    },
    event: {
        inInbox: true,
        inPopup: true,
        inBanner: true,
        inChangelog: false
    },
    maintenance: {
        inInbox: true,
        inPopup: false,
        inBanner: true,
        inChangelog: false
    }
};
