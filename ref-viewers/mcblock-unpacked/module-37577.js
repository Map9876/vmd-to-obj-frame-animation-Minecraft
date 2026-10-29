import "./module-86897.js";
import O from "./module-68321.js";
import { YouTubeEmbed } from "./module-13067.js";
import S from "./module-57445.js";
export default function(e) {
    let { html, scripts, stylesheets } = YouTubeEmbed(e);
    return <S height={e.height || null} width={e.width || null} html={html} dataNtpc="YouTubeEmbed">{scripts?.map((e)=><O key={e.url} src={e.url} strategy={u[e.strategy]} stylesheets={stylesheets}/>)}</S>;
};
let u = {
    server: "beforeInteractive",
    client: "afterInteractive",
    idle: "lazyOnload",
    worker: "worker"
};
