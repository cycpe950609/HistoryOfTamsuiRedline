import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./main.css";
import { defaultPosition } from "./data/RedLineInfo";
import { baseMaps, overlayMaps } from "./Layers";

export type Messagebox = {
    options: {
        position: L.ControlPosition,
        timeout: number
    },
    onAdd: (map : L.Map) => void ,
    show: (message:string, timeout?:number) => void,
    close: ()=> void
} & L.Control
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");

    let map = L.map("cvsCNT", {
        center: defaultPosition,
        zoom: 13
        // zoomControl: false,
        // attributionControl: false,
    });

    L.control.layers(baseMaps, overlayMaps,{collapsed: false,sortLayers: false}).addTo(map);
    baseMaps.現代底圖.addTo(map); //Set default
});
