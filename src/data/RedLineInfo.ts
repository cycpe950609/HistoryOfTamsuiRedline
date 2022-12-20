import { LatLngExpression, LatLngTuple } from "leaflet";
import { allMetroStation, redlineMetroRail , redlineMetroStation } from "./MetroInfo";
import { Population1915, Population1997 } from "./Population";
import { allRailStation, redlineRailwayRail, redlineRailwayStation, railway淡水台北 } from "./RailwayInfo";
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
            redlineRailwayStation.台鐵_台北OLD  ,
        ],
        "Rail" : redlineRailwayRail,
        "Event" : "劉銘傳時開發之車站"
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
        "Event" : "新增一些車站"
    },
    "1915" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_石牌     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_劍潭     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_雙連     ,
            redlineRailwayStation.台鐵_長安     ,
            redlineRailwayStation.台鐵_台北     ,
            redlineRailwayStation.台鐵_北門     ,
            redlineRailwayStation.台鐵_大稻埕   ,
        ],
        "Rail" : redlineRailwayRail,
        "Event" : "新增一些車站"
    },
    "1923" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_石牌     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_劍潭     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_雙連     ,
            redlineRailwayStation.台鐵_長安     ,
            redlineRailwayStation.台鐵_台北     ,
            redlineRailwayStation.台鐵_大稻埕   ,
        ],
        "Rail" : redlineRailwayRail,
        "Event" : "北門站廢除"
    },
    "1930" : {// 所以竹圍站是1930還是1932
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_竹圍     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_石牌     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_劍潭     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_雙連     ,
            redlineRailwayStation.台鐵_長安     ,
            redlineRailwayStation.台鐵_台北     ,
            redlineRailwayStation.台鐵_大稻埕   ,
        ],
        "Rail" : redlineRailwayRail,
        "Event" : "新增竹圍站"
    },
    "1937" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_竹圍     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_石牌     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_劍潭     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_雙連     ,
            redlineRailwayStation.台鐵_長安     ,
            redlineRailwayStation.台鐵_台北     ,
        ],
        "Rail" : railway淡水台北,
        "Event" : "大稻埕站廢止"
    },
    "1942" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_竹圍     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_石牌     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_雙連     ,
            redlineRailwayStation.台鐵_台北     ,
        ],
        "Rail" : railway淡水台北,
        "Event" : "宮ノ下、長安站廢止"
    },
    "1953" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_竹圍     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_石牌     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_劍潭     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_雙連     ,
            redlineRailwayStation.台鐵_長安     ,
            redlineRailwayStation.台鐵_台北     ,
        ],
        "Rail" : railway淡水台北,
        "Event" : "宮ノ下、長安站啟用數月"
    },
    "1958" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_竹圍     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_王家廟   ,
            redlineRailwayStation.台鐵_石牌     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_雙連     ,
            redlineRailwayStation.台鐵_台北     ,
        ],
        "Rail" : railway淡水台北,
        "Event" : "王家廟站成立"
    },
    "1960" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_竹圍     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_忠義     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_王家廟   ,
            redlineRailwayStation.台鐵_石牌     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_雙連     ,
            redlineRailwayStation.台鐵_台北     ,
        ],
        "Rail" : railway淡水台北,
        "Event" : "忠義站成立"
    },
    "1988" : {
        "Station" : [
            redlineRailwayStation.台鐵_淡水     ,
            redlineRailwayStation.台鐵_竹圍     ,
            redlineRailwayStation.台鐵_關渡     ,
            redlineRailwayStation.台鐵_忠義     ,
            redlineRailwayStation.台鐵_北投     ,
            redlineRailwayStation.台鐵_王家廟   ,
            redlineRailwayStation.台鐵_石牌     ,
            redlineRailwayStation.台鐵_士林     ,
            redlineRailwayStation.台鐵_圓山     ,
            redlineRailwayStation.台鐵_雙連     ,
            redlineRailwayStation.台鐵_台北     ,
        ],
        "Rail" : railway淡水台北,
        "Event" : "台鐵淡水線廢止，改建捷運線"
    },
    "1997" : {
        "Station" : allMetroStation,
        "Rail" : redlineMetroRail,
        "Event" : "捷運淡水線通車"
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
