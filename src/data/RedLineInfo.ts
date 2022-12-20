import { LatLngExpression, LatLngTuple } from "leaflet";
import { redlineMetroRail , redlineMetroStation } from "./MetroInfo";
import { Population1915, Population1997 } from "./Population";
import { allRailStation, redlineRailwayRail, redlineRailwayStation } from "./RailwayInfo";
import { getRailStationLayer, StationInfo } from "./utils";

export type DataType = {
    Station: StationInfo[];
    Rail: LatLngTuple[];
    Event: string;
}

export const defaultPosition = [25.1293052, 121.4766132] as LatLngTuple;
export const redlineData = {
    "1901" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_台北     ,
        ],
        "Rail" : redlineRailwayRail,
        "Event" : ""
    },
    "1903" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_台北     ,
            redlineRailwayStation.台鐵_大稻埕   ,
        ],
        "Rail" : redlineRailwayRail,
        "Event" : ""
    },
    "1915" : {
        "Station" : allRailStation,
        "Rail" : redlineRailwayRail,
        "Event" : ""
    },
    "1923" : {
        "Station" : allRailStation,
        "Rail" : redlineRailwayRail,
        "Event" : ""
    },
    "1932" : {
        "Station" : allRailStation,
        "Rail" : redlineRailwayRail,
        "Event" : ""
    },
    "1937" : {
        "Station" : allRailStation,
        "Rail" : redlineRailwayRail,
        "Event" : ""
    },
    "1950" : {
        "Station" : allRailStation,
        "Rail" : redlineRailwayRail,
        "Event" : ""
    },
    "1997" : {
        "Station" : allRailStation,
        "Rail" : redlineMetroRail,
        "Event" : ""
    },
} as {[name:string]:DataType}

function getRedlineLayerFunc() {
    let rtv = {} as {[name:string]:(color:string) => L.LayerGroup}
    rtv["Hide"] = getRailStationLayer([],[]);
    for(let key in redlineData)
        rtv[key] = getRailStationLayer(redlineData[key].Rail,redlineData[key].Station)
    return rtv;
}

const redlineLayer = getRedlineLayerFunc()

export default redlineLayer;
