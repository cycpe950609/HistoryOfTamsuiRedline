import L , { LatLngExpression } from "leaflet";

export const redlineRailwayRail = [
    [25.16832, 121.44481],
    [25.16344, 121.45128],
    [25.16272, 121.45186],
    [25.16103, 121.4525],
    [25.16026, 121.45301],
    [25.15965, 121.45387],
    [25.1586, 121.4566],
    [25.15793, 121.45759],
    [25.15716, 121.45821],
    [25.15643, 121.45848],
    [25.15566, 121.4586],
    [25.15316, 121.45878],
    [25.15172, 121.459],
    [25.14753, 121.45941],
    [25.13891, 121.45943],
    [25.13796, 121.45939],
    [25.1358, 121.4595],
    [25.13488, 121.45925],
    [25.1332, 121.45831],
    [25.13246, 121.458],
    [25.13159, 121.45798],
    [25.13076, 121.45822],
    [25.12541, 121.46119],
    [25.12448, 121.46199],
    [25.12394, 121.46287],
    [25.12376, 121.46386],
    [25.12385, 121.46496],
    [25.12433, 121.46598],
    [25.12489, 121.46656],
    [25.1268, 121.46791],
    [25.12718, 121.46827],
    [25.12904, 121.47067],
    [25.13506, 121.47862],
    [25.13701, 121.48295],
    [25.13735, 121.48452],
    [25.1379, 121.48771],
    [25.13817, 121.49048],
    [25.13656, 121.49396],
    [25.13502, 121.49606],
    [25.13028, 121.49977],
    [25.12912, 121.50039],
    [25.12339, 121.50157],
    [25.122478, 121.502019],
    [25.122129, 121.502336],
    [25.12173, 121.502851],
    [25.121444, 121.503387],
    [25.12123, 121.504101],
    [25.120094, 121.510372],
    [25.119899, 121.511053],
    [25.119618, 121.511659],
    [25.119317, 121.512067],
    [25.11885, 121.512533],
    [25.11255, 121.51694],
    [25.10563, 121.52166],
    [25.10457, 121.5222],
    [25.10153, 121.52277],
    [25.10056, 121.52318],
    [25.09757, 121.5247],
    [25.09263, 121.52649],
    [25.0901, 121.52722],
    [25.08898, 121.52728],
    [25.08789, 121.52689],
    [25.08608, 121.52546],
    [25.08554, 121.5252],
    [25.08023, 121.52385],
    [25.07428, 121.52082],
    [25.07337, 121.52044],
    [25.06822, 121.51964],
    [25.06441, 121.519],
    [25.06126, 121.51994],
    [25.05995, 121.52058],
    [25.05913, 121.52075],
    [25.0564, 121.52052],
    [25.0516, 121.52031],
    [25.05043, 121.52014],
    [25.04911, 121.51917],
    [25.04847 , 121.51473],     
    [25.049444 , 121.510361],    
    [25.05177 , 121.5094],     
    // [25.04779, 121.51829],
    // [25.04608, 121.51741],
    // [25.04129, 121.51611],
    // [25.03821, 121.51509],
    // [25.03503, 121.51657],
    // [25.03197, 121.51884]
] as LatLngExpression[];

// prettier-ignore
export const redlineRailwayStation = {
    // Index            : { name : Name             , latitude : Latitude      , longtitude : Longitude     , title : Title of popup                                    },
    "台鐵_淡水"         : { name : "淡水"           , latitude : 25.168053     , longtitude : 121.445194    , title : "淡水站   (Tansui             →   Tanshui)"       },
    "台鐵_竹圍"         : { name : "竹圍"           , latitude : 25.137        , longtitude : 121.459503    , title : "竹圍站   (Chikui)"                               },
    "台鐵_關渡"         : { name : "關渡"           , latitude : 25.125833     , longtitude : 121.467222    , title : "關渡站   (Kantō(江頭)        →   Kuantu)"        },
    "台鐵_忠義"         : { name : "忠義"           , latitude : 25.131111     , longtitude : 121.473333    , title : "忠義站   (Chungyi)"                              },
    "台鐵_北投"         : { name : "北投"           , latitude : 25.131944     , longtitude : 121.498611    , title : "北投站   (Hokuto             →   Peitou)"        },
    "台鐵_王家廟"       : { name : "王家廟"         , latitude : 25.1219322    , longtitude : 121.5021768   , title : "王家廟站 (Wangchia Miao)"                        },
    "台鐵_石牌"         : { name : "石牌"           , latitude : 25.114519     , longtitude : 121.515644    , title : "石牌站   (Kirigan(唭里岸)    →   Shihpai)"       },
    "台鐵_士林"         : { name : "士林"           , latitude : 25.093453     , longtitude : 121.526211    , title : "士林站   (Shirin             →   Shihlin)"       },
    "台鐵_劍潭"         : { name : "劍潭"           , latitude : 25.084389     , longtitude : 121.525       , title : "劍潭站   (Miyanoshita(宮ノ下)→   Chientan)"      },
    "台鐵_圓山"         : { name : "圓山"           , latitude : 25.07146      , longtitude : 121.520172    , title : "圓山站   (Maruyama           →   Yuanshan)"      },
    "台鐵_雙連"         : { name : "雙連"           , latitude : 25.05931      , longtitude : 121.52073     , title : "雙連站   (Soren              →   Shuanglien)"    },
    "台鐵_長安"         : { name : "長安"           , latitude : 25.05089      , longtitude : 121.52006836  , title : "長安站   (Taishōgai(大正街)  →   Chang-an)"      },
    "台鐵_台北"         : { name : "台北"           , latitude : 25.04847      , longtitude : 121.51473     , title : "台北站   (Taihoku            →   Taipei)"        },
    "台鐵_北門"         : { name : "北門"           , latitude : 25.049444     , longtitude : 121.510361    , title : "北門站   (Hokumon)"                              },
    "台鐵_大稻埕"       : { name : "大稻埕"          , latitude : 25.05177      , longtitude : 121.5094      , title : "大稻埕站 (Daitotei)"                             },
}


let redlineRailwayStationMarker: {
    [name: string]: {
        popup: L.Popup;
        marker: L.Circle;
    };
} = {};

let redlineRailwayRailMark = [ L.polyline(redlineRailwayRail, { color: "blue" }) as any];

let redlineRailwayStationProperty: keyof typeof redlineRailwayStation;
for (redlineRailwayStationProperty in redlineRailwayStation) {
    let key = redlineRailwayStationProperty;
    let station = redlineRailwayStation[key];
    redlineRailwayStationMarker[key] = {
        popup: L.popup({ content: station.title }),
        marker: L.circle([station.latitude, station.longtitude], {
            radius: 50,
            color: "blue",
            fill: true,
            fillColor: "blue",
            fillOpacity: 1
        })
    };
    // redlineStationMarker[key].marker.addTo(map);
    redlineRailwayStationMarker[key].marker.bindPopup(
        redlineRailwayStationMarker[key].popup
    );
    redlineRailwayRailMark.push(redlineRailwayStationMarker[key].marker)
}

const RailwayLayer = L.layerGroup(redlineRailwayRailMark);

export default RailwayLayer;