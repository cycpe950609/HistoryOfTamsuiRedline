import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./main.css";
import { defaultPosition } from "./data/RedLineInfo";
import MetroLayer, { redlineMetroRail, redlineMetroStation } from "./data/MetroInfo";
import { baseMaps, overlayMaps } from "./data/MapInfo";
import * as  TimeLineSlider  from "./timeline.mjs";



document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");

    let map = L.map("cvsCNT", {
        center: defaultPosition,
        zoom: 13
        // zoomControl: false,
        // attributionControl: false,
    });

    // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //     maxZoom: 19,
    //     attribution:
    //         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map);

    // L.tileLayer(
    //     "https://gis.sinica.edu.tw/tileserver/file-exists.php?img=Admin_1901c-png-{z}-{x}-{y}",
    //     {
    //         maxZoom: 19,
    //         attribution:
    //             '&copy; <a href="https://gis.sinica.edu.tw/tileserver/wmts">中央研究院臺灣百年歷史地圖 WMTS 服務</a>'
    //     }
    // ).addTo(map);

    L.control.layers(baseMaps, overlayMaps).addTo(map);
    baseMaps.現代底圖.addTo(map); //Set default

    MetroLayer.addTo(map);

    let timelist = ["Hide"]
    for(let i = 0;i < 5;i++ )
        timelist.push((1900+i).toString());

    TimeLineSlider.timelineSlider({
        timelineItems : timelist,
        position: 'bottomleft',
        labelWidth: "40px",
    }).addTo(map)
    TimeLineSlider.timelineSlider({
        timelineItems : timelist,
        position: 'bottomleft',
        labelWidth: "40px",
        activeColor: "#FF0000"
    }).addTo(map)
    // RailwayLayer.addTo(map);

    // map.addLayer(new InfiniteCanvas())
    // map.addLayer(new DebugCoordsLayer())
});
