import "./module-86897.js";
import { GoogleMapsEmbed } from "./module-13067.js";
import L from "./module-57445.js";
export default function({ apiKey, ...rest }) {
    let n = {
        ...rest,
        key: apiKey
    };
    let { html } = GoogleMapsEmbed(n);
    return <L height={n.height || null} width={n.width || null} html={html} dataNtpc="GoogleMapsEmbed"/>;
};
