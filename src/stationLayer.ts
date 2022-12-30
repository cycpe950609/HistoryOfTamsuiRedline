import L from "leaflet"
import redlineLayer, { redlineData } from "./data/RedLineInfo";
import { getLayerWithColor } from "./data/utils";
import { Messagebox } from "./main";
import MapTimeline from "./maptimeline";
import * as Message from "./message.mjs";

class StationLayer extends L.Layer {
    constructor() { 
        super() 
        this.overlay1eventBox = Message.messagebox({timeout: 0 , position : "bottomright"})
        this.overlay2eventBox = Message.messagebox({timeout: 0 , position : "bottomright"})
        this.timeline1 = MapTimeline({changeMap : this.overlay1changeMap , initValue: 2, activeColor: this.overlay1activeColor });
        this.timeline2 = MapTimeline({changeMap : this.overlay2changeMap , activeColor: this.overlay2activeColor });
    
    }

    private overlay1activeColor = "#37adbf";
    private overlay1 = "1901";
    private overlay1Layers : {[name: string]: L.LayerGroup} = getLayerWithColor(redlineLayer,this.overlay1activeColor)
    private overlay2activeColor = "#00ff00";
    private overlay2 = "Hide";
    private overlay2Layers : {[name: string]: L.LayerGroup} = getLayerWithColor(redlineLayer,this.overlay2activeColor,0.0008)

    private overlay1eventBox : Messagebox;
    private overlay2eventBox : Messagebox;

    private timeline1;
    private timeline2;

    private overlay1changeMap = (param: { label: string; value: number; map: L.Map; }) => {
        // console.log(`change Map ${overlay1} to ${param.label}`)
        if(param.label !== this.overlay1)
        {
            console.log(`change overlay 1 Map ${this.overlay1} to ${param.label}`)
            param.map.removeLayer(this.overlay1Layers[this.overlay1]);
            param.map.removeLayer(this.overlay2Layers[this.overlay2]);
            param.map.addLayer(this.overlay1Layers[param.label]);
            param.map.addLayer(this.overlay2Layers[this.overlay2])
            this.overlay1eventBox.show("Layer 1 : " + (param.label !== "Hide" ? redlineData[param.label].Event : "Nothing showed"))
            this.overlay2eventBox.show("Layer 2 : " + (this.overlay2 !== "Hide" ? redlineData[this.overlay2].Event : "Nothing showed"))
            this.overlay1 = param.label;
        }
    }

    private overlay2changeMap = (param: { label: string; value: number; map: L.Map; }) => {
        // console.log(`change Map ${overlay1} to ${param.label}`)
        if(param.label !== this.overlay2)
        {
            console.log(`change overlay 2 Map ${this.overlay2} to ${param.label}`)
            param.map.removeLayer(this.overlay1Layers[this.overlay1]);
            param.map.removeLayer(this.overlay2Layers[this.overlay2]);
            param.map.addLayer(this.overlay1Layers[this.overlay1])
            param.map.addLayer(this.overlay2Layers[param.label]);
            this.overlay1eventBox.show("Layer 1 : " + (this.overlay1 !== "Hide" ? redlineData[this.overlay1].Event : "Nothing showed"))
            this.overlay2eventBox.show("Layer 2 : " + (param.label !== "Hide" ? redlineData[param.label].Event : "Nothing showed"))
            this.overlay2 = param.label;
        }
    }

    onAdd(map: L.Map): this {
        
        map.addLayer(this.overlay1Layers[this.overlay1])
        map.addLayer(this.overlay2Layers[this.overlay2])

        this.timeline1.addTo(map);
        this.timeline2.addTo(map);
        this.overlay1eventBox.addTo(map);
        this.overlay2eventBox.addTo(map);
        this.overlay1eventBox.show("Layer 1 : " + (this.overlay1 !== "Hide" ? redlineData[this.overlay1].Event : "Nothing showed"))
        this.overlay2eventBox.show("Layer 2 : " + (this.overlay2 !== "Hide" ? redlineData[this.overlay2].Event : "Nothing showed"))

        
        return this;
    }

    onRemove(map: L.Map): this {

        map.removeLayer(this.overlay1Layers[this.overlay1]);
        map.removeLayer(this.overlay2Layers[this.overlay2]);
        map.removeControl(this.overlay1eventBox);
        map.removeControl(this.overlay2eventBox);
        map.removeControl(this.timeline1);
        map.removeControl(this.timeline2);
        return this;
    }

}

export default StationLayer;