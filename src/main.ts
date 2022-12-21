import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./main.css";
import redlineLayer , { redlineData, defaultPosition } from "./data/RedLineInfo";
import { baseMaps, overlayMaps } from "./Layers";
import MapTimeline from "./maptimeline";
import { getLayerWithColor } from "./data/utils";
// import "./message.css";
import * as d3 from "d3"
import "d3-geo"
import VillageLayer from "./villageLayer";
import { Population1997 } from "./data/Population";
import StationLayer from "./stationLayer";

export type Messagebox = {
    options: {
        position: L.ControlPosition,
        timeout: number
    },
    onAdd: (map : L.Map) => void ,
    show: (message:string, timeout?:number) => void,
    close: ()=> void
} & L.Control


// const testing = () => {
//     if("Hide" in redlineLayer)
//         throw new Error("Someone insert value")
//     window.requestAnimationFrame(testing);
// }

// window.requestAnimationFrame(testing);
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");

    let map = L.map("cvsCNT", {
        center: defaultPosition,
        zoom: 13
        // zoomControl: false,
        // attributionControl: false,
    });

    L.control.layers(baseMaps, overlayMaps).addTo(map);
    baseMaps.現代底圖.addTo(map); //Set default
    
    // new StationLayer().addTo(map);

    // new VillageLayer(village2022Data,Population1997).addTo(map);

    // RailwayLayer.addTo(map);

    // map.addLayer(new InfiniteCanvas())
    // map.addLayer(new DebugCoordsLayer())
});
