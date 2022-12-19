import L from "leaflet";
import "leaflet/dist/leaflet.css";
import InfiniteCanvas, { DebugCoordsLayer } from "./canvas/InfiniteCanvas";
import "./main.css";
import { defaultPosition } from "./data/RedLineInfo";
import { redlineMetroRail, redlineMetroStation } from "./data/MetroInfo";
import { redlineRailwayStation } from "./data/RailwayInfo";
import { baseMaps, overlayMaps } from "./data/MapInfo";

let redlineStationMarker: {
    [name: string]: {
        popup: L.Popup;
        marker: L.Circle;
    };
} = {};

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");

    let map = L.map("cvsCNT", {
        center: defaultPosition,
        zoom: 17
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

    L.polyline(redlineMetroRail, { color: "red" }).addTo(map);

    let redlineMetroStationProperty: keyof typeof redlineMetroStation;
    for (redlineMetroStationProperty in redlineMetroStation) {
        let key = redlineMetroStationProperty;
        let station = redlineMetroStation[key];
        redlineStationMarker[key] = {
            popup: L.popup({ content: station.title }),
            marker: L.circle([station.latitude, station.longtitude], {
                radius: 50,
                color: "red",
                fill: true,
                fillColor: "red",
                fillOpacity: 1
            })
        };
        redlineStationMarker[key].marker.addTo(map);
        redlineStationMarker[key].marker.bindPopup(
            redlineStationMarker[key].popup
        );
    }

    let redlineRailwayStationProperty: keyof typeof redlineRailwayStation;
    for (redlineRailwayStationProperty in redlineRailwayStation) {
        let key = redlineRailwayStationProperty;
        let station = redlineRailwayStation[key];
        redlineStationMarker[key] = {
            popup: L.popup({ content: station.title }),
            marker: L.circle([station.latitude, station.longtitude], {
                radius: 50,
                color: "blue",
                fill: true,
                fillColor: "blue",
                fillOpacity: 1
            })
        };
        redlineStationMarker[key].marker.addTo(map);
        redlineStationMarker[key].marker.bindPopup(
            redlineStationMarker[key].popup
        );
    }

    // map.addLayer(new InfiniteCanvas())
    // map.addLayer(new DebugCoordsLayer())
});
