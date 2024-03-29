import L,{ LatLngExpression } from "leaflet";
import { stationInfoText } from "./stationInfo";
import { getRailStationLayer, RailInfo } from "./utils";

// #####################################################################
// #                            Metro                                  #
// #####################################################################
export const redlineMetroRail = [
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
    [25.04779, 121.51829],
    [25.04608, 121.51741],
    [25.04129, 121.51611],
    [25.03821, 121.51509],
    // [25.03503, 121.51657],
    // [25.03197, 121.51884]
] as RailInfo;

// prettier-ignore
export const redlineMetroStation = {
    // Index            : { name : Name             , latitude : Latitude      , longtitude : Longitude     , title : Title of popup                                                            },
    // "捷運_中正紀念堂"   : { name : "中正紀念堂"     , latitude : 25.032729     , longtitude : 121.51827     , title : "中正紀念堂站(Chiang Kai-Shek Memorial Hall Station) | 台北市中正區"      },
    // "捷運_台大醫院"     : { name : "台大醫院"       , latitude : 25.041256     , longtitude : 121.51604     , title : "台大醫院站(NTU Hospital Station) | 台北市中正區"                         },
    "捷運_台北車"       : { name : "台北車"         , latitude : 25.0464886    , longtitude : 121.5172638   , title : "台北車站(Taipei Main Station) | 台北市中正區"                            , info: stationInfoText.台北車},
    "捷運_中山"         : { name : "中山"           , latitude : 25.0529451    , longtitude : 121.5203157   , title : "中山站(Zhongshan Station) | 台北市中山區"                                , info: stationInfoText.中山},
    "捷運_雙連"         : { name : "雙連"           , latitude : 25.0579015    , longtitude : 121.5206032   , title : "雙連站(Shuanglian Station) | 台北市大同區"                               , info: stationInfoText.雙連},
    "捷運_民權西路"     : { name : "民權西路"       , latitude : 25.062905     , longtitude : 121.519319    , title : "民權西路站(Minquan W. Road Station) | 台北市大同區"                      , info: stationInfoText.民權西路},
    "捷運_圓山"         : { name : "圓山"           , latitude : 25.071353     , longtitude : 121.520118    , title : "圓山站(Yuanshan Station) | 台北市大同區"                                 , info: stationInfoText.圓山},
    "捷運_劍潭"         : { name : "劍潭"           , latitude : 25.084873     , longtitude : 121.525077    , title : "劍潭站(Jiantan Station) | 台北市士林區"                                  , info: stationInfoText.劍潭},
    "捷運_士林"         : { name : "士林"           , latitude : 25.093535     , longtitude : 121.526229    , title : "士林站(Shilin Station) | 台北市士林區"                                   , info: stationInfoText.士林},
    "捷運_芝山"         : { name : "芝山"           , latitude : 25.103059     , longtitude : 121.522513    , title : "芝山站(Zhishan Station) | 台北市士林區"                                  , info: stationInfoText.芝山},
    "捷運_明德"         : { name : "明德"           , latitude : 25.10972      , longtitude : 121.518848    , title : "明德站(Mingde Station) | 台北市北投區"                                   , info: stationInfoText.明德},
    "捷運_石牌"         : { name : "石牌"           , latitude : 25.114523     , longtitude : 121.515559    , title : "石牌站(Shipai Station) | 台北市北投區"                                   , info: stationInfoText.石牌},
    "捷運_唭哩岸"       : { name : "唭哩岸"         , latitude : 25.120871     , longtitude : 121.506252    , title : "唭哩岸站(Qilian Station) | 台北市北投區"                                 , info: stationInfoText.唭哩岸},
    "捷運_奇岩"         : { name : "奇岩"           , latitude : 25.125491     , longtitude : 121.501132    , title : "奇岩站(Qiyan Station) | 台北市北投區"                                    , info: stationInfoText.奇岩},
    "捷運_北投"         : { name : "北投"           , latitude : 25.13184      , longtitude : 121.498632    , title : "北投站(Beitou Station) | 台北市北投區"                                   , info: stationInfoText.北投},
    "捷運_復興崗"       : { name : "復興崗"         , latitude : 25.137473     , longtitude : 121.485444    , title : "復興崗站(Fuxinggang Station) | 台北市北投區"                             , info: stationInfoText.復興崗},
    "捷運_忠義"         : { name : "忠義"           , latitude : 25.130969     , longtitude : 121.473409    , title : "忠義站(Zhongyi Station) | 台北市北投區"                                  , info: stationInfoText.忠義},
    "捷運_關渡"         : { name : "關渡"           , latitude : 25.125632     , longtitude : 121.467102    , title : "關渡站(Guandu Station) | 台北市北投區"                                   , info: stationInfoText.關渡},
    "捷運_竹圍"         : { name : "竹圍"           , latitude : 25.13694      , longtitude : 121.459479    , title : "竹圍站(Zhuwei Station) | 新北市淡水區"                                   , info: stationInfoText.竹圍},
    "捷運_紅樹林"       : { name : "紅樹林"         , latitude : 25.154042     , longtitude : 121.458871    , title : "紅樹林站(Hongshulin Station) | 新北市淡水區"                             , info: stationInfoText.紅樹林},
    "捷運_淡水"         : { name : "淡水"           , latitude : 25.167817     , longtitude : 121.44556     , title : "淡水站(Tamsui Station) | 新北市淡水區"                                   , info: stationInfoText.淡水},
}

export const allMetroStation = [
    // redlineMetroStation.捷運_中正紀念堂 ,
    // redlineMetroStation.捷運_台大醫院   ,
    redlineMetroStation.捷運_台北車     ,
    redlineMetroStation.捷運_中山       ,
    redlineMetroStation.捷運_雙連       ,
    redlineMetroStation.捷運_民權西路    ,
    redlineMetroStation.捷運_圓山       ,
    redlineMetroStation.捷運_劍潭       ,
    redlineMetroStation.捷運_士林       ,
    redlineMetroStation.捷運_芝山       ,
    redlineMetroStation.捷運_明德       ,
    redlineMetroStation.捷運_石牌       ,
    redlineMetroStation.捷運_唭哩岸     ,
    redlineMetroStation.捷運_奇岩       ,
    redlineMetroStation.捷運_北投       ,
    redlineMetroStation.捷運_復興崗     ,
    redlineMetroStation.捷運_忠義       ,
    redlineMetroStation.捷運_關渡       ,
    redlineMetroStation.捷運_竹圍       ,
    redlineMetroStation.捷運_紅樹林     ,
    redlineMetroStation.捷運_淡水       ,
]

const MetroLayer = getRailStationLayer(redlineMetroRail,allMetroStation)("red");


export default MetroLayer;
