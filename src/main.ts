import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./main.css";
import redlineLayer , { redlineData, defaultPosition } from "./data/RedLineInfo";
import { baseMaps, overlayMaps } from "./data/MapInfo";
import MapTimeline from "./maptimeline";
import * as Message from "./message.mjs";
import { getLayerWithColor } from "./data/utils";
// import "./message.css";

type Messagebox = {
    options: {
        position: L.ControlPosition,
        timeout: number
    },
    onAdd: (map : L.Map) => void ,
    show: (message:string, timeout?:number) => void
} & L.Control

let overlay1activeColor = "#37adbf";
let overlay1 = "1901";
let overlay1Layers : {[name: string]: L.LayerGroup} = getLayerWithColor(redlineLayer,overlay1activeColor)
let overlay2activeColor = "#00ff00";
let overlay2 = "Hide";
let overlay2Layers : {[name: string]: L.LayerGroup} = getLayerWithColor(redlineLayer,overlay2activeColor,0.0008)

let overlay1eventBox : Messagebox;
let overlay2eventBox : Messagebox;
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

    map.addLayer(overlay1Layers[overlay1])
    map.addLayer(overlay2Layers[overlay2])

    let overlay1changeMap = (param: { label: string; value: number; map: L.Map; }) => {
        // console.log(`change Map ${overlay1} to ${param.label}`)
        if(param.label !== overlay1)
        {
            console.log(`change overlay 1 Map ${overlay1} to ${param.label}`)
            map.removeLayer(overlay1Layers[overlay1]);
            map.removeLayer(overlay2Layers[overlay2]);
            map.addLayer(overlay1Layers[param.label]);
            map.addLayer(overlay2Layers[overlay2])
            overlay1eventBox.show("Layer 1 : " + (param.label !== "Hide" ? redlineData[param.label].Event : "Nothing showed"))
            overlay2eventBox.show("Layer 2 : " + (overlay2 !== "Hide" ? redlineData[overlay2].Event : "Nothing showed"))
            overlay1 = param.label;
        }
    }

    let overlay2changeMap = (param: { label: string; value: number; map: L.Map; }) => {
        // console.log(`change Map ${overlay1} to ${param.label}`)
        if(param.label !== overlay2)
        {
            console.log(`change overlay 2 Map ${overlay2} to ${param.label}`)
            map.removeLayer(overlay1Layers[overlay1]);
            map.removeLayer(overlay2Layers[overlay2]);
            map.addLayer(overlay1Layers[overlay1])
            map.addLayer(overlay2Layers[param.label]);
            overlay1eventBox.show("Layer 1 : " + (overlay1 !== "Hide" ? redlineData[overlay1].Event : "Nothing showed"))
            overlay2eventBox.show("Layer 2 : " + (param.label !== "Hide" ? redlineData[param.label].Event : "Nothing showed"))
            overlay2 = param.label;
        }
    }


    MapTimeline({changeMap : overlay1changeMap , initValue: 2, activeColor: overlay1activeColor }).addTo(map)
    MapTimeline({changeMap : overlay2changeMap , activeColor: overlay2activeColor }).addTo(map);

    let box = Message.messagebox({timeout: 0 }).addTo(map);
    box.show( 'This is the message' );
    box.show( 'This is the message 2' );

    overlay1eventBox = Message.messagebox({timeout: 0 , position : "bottomright"}).addTo(map);
    overlay2eventBox = Message.messagebox({timeout: 0 , position : "bottomright"}).addTo(map);
    overlay1eventBox.show("Layer 1 : " + (overlay1 !== "Hide" ? redlineData[overlay1].Event : "Nothing showed"))
    overlay2eventBox.show("Layer 2 : " + (overlay2 !== "Hide" ? redlineData[overlay2].Event : "Nothing showed"))

    // RailwayLayer.addTo(map);

    // map.addLayer(new InfiniteCanvas())
    // map.addLayer(new DebugCoordsLayer())
});
