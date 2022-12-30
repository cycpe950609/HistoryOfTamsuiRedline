import L , { LatLng, LatLngExpression, LatLngTuple } from "leaflet";
import { redlineData } from "./RedLineInfo";
import { cloneDeep } from "lodash";

export type StationInfo =  {
    name: string;
    latitude: number;
    longtitude: number;
    title: string;
    info: string;
}

export type RailInfo = LatLngTuple[];
let redlineStationMarker: {
    [name: string]: {
        popup: L.Popup;
        marker: L.Circle;
    };
} = {};

export const getRailStationLayer = (rail : RailInfo, stations : StationInfo[]) => (color: string = "#37adbf",offset: number = 0) => {

    let offsetRail = rail.map((pt:L.LatLngTuple)=>{
        return [pt[0]+offset,pt[1] + offset] as LatLngTuple
        })

    let redlineRailLayerObject = [ L.polyline(offsetRail, { color: color }) as any];

    stations.map((station:StationInfo)=>{
        let key = station.name;
        redlineStationMarker[key] = {
            popup: L.popup({ content: station.title + station.info }),
            marker: L.circle([station.latitude+offset, station.longtitude+offset], {
                radius: 50,
                color: color,
                fill: true,
                fillColor: color,
                fillOpacity: 1
            })
        };
        // redlineStationMarker[key].marker.addTo(map);
        redlineStationMarker[key].marker.bindPopup(
            redlineStationMarker[key].popup
        );
        redlineStationMarker[key].marker.on('mouseover',function(ev) {
            ev.target.openPopup();
        });
        redlineRailLayerObject.push(redlineStationMarker[key].marker)
    })

    return L.layerGroup(redlineRailLayerObject)
}


export const getLayerWithColor = (layers : {[name:string]:(color:string,offset:number) => L.LayerGroup},color:string,offset: number = 0) => {
    console.log(`GetLayerWithColor ${offset}`)
    let _rtv = {} as {[name:string]:L.LayerGroup}
    for(let key in layers)
    {   
        _rtv[key] = layers[key](color,offset);
    }

    return _rtv;
}

