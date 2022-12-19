import L from "leaflet";
import MetroLayer from "./MetroInfo";
import RailwayLayer from "./RailwayInfo";

export const baseMaps = {
    現代底圖: L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    明治堡圖: L.tileLayer(
        "https://gis.sinica.edu.tw/tileserver/file-exists.php?img=JM20K_1904-jpg-{z}-{x}-{y}",
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://gis.sinica.edu.tw/tileserver/wmts">中央研究院臺灣百年歷史地圖 WMTS 服務</a>'
        }
    )
};

export const overlayMaps = {
    堡庄分界: L.tileLayer(
        "https://gis.sinica.edu.tw/tileserver/file-exists.php?img=Admin_1901c-png-{z}-{x}-{y}",
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://gis.sinica.edu.tw/tileserver/wmts">中央研究院臺灣百年歷史地圖 WMTS 服務</a>'
        }
    ),

    村里分界: L.tileLayer(
        "https://gis.sinica.edu.tw/tileserver/file-exists.php?img=Admin_1901c-png-{z}-{x}-{y}",
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://gis.sinica.edu.tw/tileserver/wmts">中央研究院臺灣百年歷史地圖 WMTS 服務</a>'
        }
    ),
    台鐵淡水線: RailwayLayer,
    捷運淡水線: MetroLayer,

};
