export let TEXT_PLAIN_CONTENT_TYPE_HEADER = "text/plain";
export let HTML_CONTENT_TYPE_HEADER = "text/html; charset=utf-8";
export let JSON_CONTENT_TYPE_HEADER = "application/json; charset=utf-8";
export let NEXT_QUERY_PARAM_PREFIX = "nxtP";
export let NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
export let MATCHED_PATH_HEADER = "x-matched-path";
export let PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
export let PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
export let RSC_PREFETCH_SUFFIX = ".prefetch.rsc";
export let RSC_SEGMENTS_DIR_SUFFIX = ".segments";
export let RSC_SEGMENT_SUFFIX = ".segment.rsc";
export let RSC_SUFFIX = ".rsc";
export let ACTION_SUFFIX = ".action";
export let NEXT_DATA_SUFFIX = ".json";
export let NEXT_META_SUFFIX = ".meta";
export let NEXT_BODY_SUFFIX = ".body";
export let NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
export let NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
export let NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
export let NEXT_RESUME_HEADER = "next-resume";
export let NEXT_CACHE_TAG_MAX_ITEMS = 128;
export let NEXT_CACHE_TAG_MAX_LENGTH = 256;
export let NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
export let NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
export let CACHE_ONE_YEAR = 31536000;
export let INFINITE_CACHE = 4294967294;
export let MIDDLEWARE_FILENAME = "middleware";
export let MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
export let INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
export let PAGES_DIR_ALIAS = "private-next-pages";
export let DOT_NEXT_ALIAS = "private-dot-next";
export let ROOT_DIR_ALIAS = "private-next-root-dir";
export let APP_DIR_ALIAS = "private-next-app-dir";
export let RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
export let RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
export let RSC_ACTION_PROXY_ALIAS = "private-next-rsc-server-reference";
export let RSC_CACHE_WRAPPER_ALIAS = "private-next-rsc-cache-wrapper";
export let RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS = "private-next-rsc-track-dynamic-import";
export let RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
export let RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
export let PUBLIC_DIR_MIDDLEWARE_CONFLICT = "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict";
export let SSG_GET_INITIAL_PROPS_CONFLICT = "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps";
export let SERVER_PROPS_GET_INIT_PROPS_CONFLICT = "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.";
export let SERVER_PROPS_SSG_CONFLICT = "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps";
export let STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props";
export let SERVER_PROPS_EXPORT_ERROR = "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export";
export let GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
export let GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
export let UNSTABLE_REVALIDATE_RENAME_ERROR = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.";
export let GSSP_COMPONENT_MEMBER_ERROR = "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member";
export let NON_STANDARD_NODE_ENV = 'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env';
export let SSG_FALLBACK_EXPORT_ERROR = "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export";
export let ESLINT_DEFAULT_DIRS = [
    "app",
    "pages",
    "components",
    "lib",
    "src"
];
export let SERVER_RUNTIME = {
    edge: "edge",
    experimentalEdge: "experimental-edge",
    nodejs: "nodejs"
};
let er = {
    shared: "shared",
    reactServerComponents: "rsc",
    serverSideRendering: "ssr",
    actionBrowser: "action-browser",
    apiNode: "api-node",
    apiEdge: "api-edge",
    middleware: "middleware",
    instrument: "instrument",
    edgeAsset: "edge-asset",
    appPagesBrowser: "app-pages-browser",
    pagesDirBrowser: "pages-dir-browser",
    pagesDirEdge: "pages-dir-edge",
    pagesDirNode: "pages-dir-node"
};
export let WEBPACK_LAYERS = {
    ...er,
    GROUP: {
        builtinReact: [
            er.reactServerComponents,
            er.actionBrowser
        ],
        serverOnly: [
            er.reactServerComponents,
            er.actionBrowser,
            er.instrument,
            er.middleware
        ],
        neutralTarget: [
            er.apiNode,
            er.apiEdge
        ],
        clientOnly: [
            er.serverSideRendering,
            er.appPagesBrowser
        ],
        bundled: [
            er.reactServerComponents,
            er.actionBrowser,
            er.serverSideRendering,
            er.appPagesBrowser,
            er.shared,
            er.instrument,
            er.middleware
        ],
        appPages: [
            er.reactServerComponents,
            er.serverSideRendering,
            er.appPagesBrowser,
            er.actionBrowser
        ]
    }
};
export let WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: "__next_edge_ssr_entry__",
    metadata: "__next_metadata__",
    metadataRoute: "__next_metadata_route__",
    metadataImageMeta: "__next_metadata_image_meta__"
};
