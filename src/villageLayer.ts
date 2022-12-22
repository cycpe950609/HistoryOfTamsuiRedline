import L, { FeatureGroup, geoJSON } from "leaflet"
import { PopulationDataType } from "./data/Population";
import { Messagebox } from "./main";
import * as Message from "./message.mjs";
import * as d3 from "d3"

type PieViewerData = {
    "areaName" : string,
    "population" : {
        [name:string]:{female:number,male:number}
    }
}

type PieDataType = {
    name:string,
    value:number,
}
class PieViewer {

    private width : number;
    private height : number;
    private radius : number;

    private data : PieViewerData;
    private svg : any;
    private color;
    constructor(width:number,height:number){
        this.width = width;
        this.height = height;
        this.radius = Math.min(width,height)/2;
        this.data = {"areaName" : "Init" , "population" : { "empty":{female:0,male:0} } }
        this.color = d3.scaleOrdinal(d3.schemeCategory10);
    }

    addTo = (CNT : HTMLDivElement) => {
        this.svg = d3.select(CNT).append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("transform", "translate(" + this.width / 2 + "," + (this.height / 2 + 10) + ")");
        
    }

    

    show = (data:PieViewerData) => {
        this.data = data;
        const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(this.radius)

        let pieData : PieDataType[] = []
        for(let it in data.population)
        {
            pieData.push({name:`${it}_female`,value:data.population[it].female})
            pieData.push({name:`${it}_male`,value:data.population[it].male})
        }


        const pie = d3.pie<PieDataType>().value(d => d.value)
        this.svg
        .selectAll('path')
        .data(pie(pieData))
        .enter()
        .append('g')
        .append('path')
        .attr('d', arc)
        .attr('fill', (d: any) => (d.data.name.split('_')[1] === "female") ? "pink":"lightblue" )
    }
}

export class VillageLayer extends L.Layer {
    constructor(geojsonData:GeoJSON.GeoJsonObject,populationData:PopulationDataType,color:string = "red",highlighColor: string = "orange",showPop: boolean = true,showOnMap: boolean = false)
    {
        super()
        // console.log("Show pop : ",showPop , " , Show on Map : " , showOnMap )
        this.geojsonData = geojsonData;
        this.populationData = populationData;
        this.color = color;
        this.highlightColor = highlighColor;
        let style = {
            "color" : this.color,
            "weight" : 5,
            "opacity": 0.65
        }
        this.populationBox = Message.messagebox({timeout: 0 });
        this.viewer = new PieViewer(200,250)
        this.showPop = showPop;
        this.showOnMap = showOnMap;
        this.geojsonLayer = L.geoJSON(this.geojsonData,{
            style : style,
            onEachFeature : this.onEachFeature,
            filter: (feature: GeoJSON.Feature) => {

                if( feature.properties )
                    if(feature.properties["VILLNAME"] in populationData)
                        return true;
                return false;
            }
        })
    }

    private geojsonData : GeoJSON.GeoJsonObject;
    private populationData:PopulationDataType;
    private color:string;
    private highlightColor:string;
    private geojsonLayer : L.GeoJSON;
    private populationBox : Messagebox;
    private showPop: boolean;
    private showOnMap: boolean;

    private viewer : PieViewer;

    private highlightFeature = (e:L.LeafletEvent) => {
        let layer = e.target;
        layer.setStyle({
            weight: 5,
            color: this.highlightColor,
            fillOpacity : 0.7
        });
        layer.bringToFront()

        if(this.showPop) {
            this.populationBox.show(this.getInfoTextOfVill(e.target.feature) + "</br>")
            this.viewer.addTo(this.populationBox.getContainer() as HTMLDivElement)
            this.viewer.show(this.getViewerDataOfVill(e.target.feature))
        }
    }

    private resetHighlightFeature = (e:L.LeafletEvent) => {
        this.geojsonLayer.resetStyle(e.target);
    }

    private getInfoTextOfVill = (feature : GeoJSON.Feature) => {
        let infoText = "";
        if(feature.properties && feature.properties["VILLNAME"]){
            let villname = feature.properties["VILLNAME"];
            if(villname in this.populationData)
            {
                const getListOfVilla = (name:string)=>{
                    let rtv = ""
                    for(let key in this.populationData[name].population)
                    {
                        rtv += `${key} : 女 ${this.populationData[name].population[key].female} 人 男 ${this.populationData[name].population[key].male} 人 ,</br>`
                    }
                    return rtv;
                }
                infoText = `${villname} :</br> ${getListOfVilla(villname)}`;
            }
        }
        return infoText;
    }

    private getViewerDataOfVill = (feature : GeoJSON.Feature) : PieViewerData => {
        if(feature.properties && feature.properties["VILLNAME"]){
            let villname = feature.properties["VILLNAME"];
            if(villname in this.populationData)
            {
                const getPopulationListOfVilla = (name:string)=>{
                    let rtv = {} as {[name:string]:any}
                    for(let key in this.populationData[name].population)
                    {
                        rtv[key] = this.populationData[name].population[key]
                    }
                    return rtv;
                }

                return {
                    "areaName" : villname,
                    "population" : getPopulationListOfVilla(villname)
                }
            }
        }
        return {"areaName" : "Error" , "population" : { "areaNotFound":{female:0,male:0} } };
    }

    private pieCNT : {[name:string]:{Tooltip:L.Layer,CNT:HTMLDivElement,Viewer:PieViewer}} = {}

    private onEachFeature = (feature: GeoJSON.Feature, layer : L.Layer) =>
    {
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlightFeature,
        })
        if(feature.properties)
        {
            // console.log("onEachFeature => Show pop : ",this.showPop , " , Show on Map : " , this.showOnMap )
            // let tooltip = layer.bindTooltip(feature.properties["VILLNAME"],{className: "village-labels",permanent:true,direction:"center"});
            if(this.showOnMap)
            {
                let container = L.DomUtil.create('div')

                let villnm = feature.properties["VILLNAME"];
                let popData = this.populationData[villnm].population;
                let totalPop = 0;
                for(let label in popData)
                {
                    totalPop += popData[label].female
                    totalPop += popData[label].male
                }
                console.log("TotalPop : ",Math.log10(totalPop)*10)
                let new_viewer = new PieViewer((Math.log2(totalPop)-5)*15,totalPop + 50);
                let tooltip = layer.bindTooltip(container,{className: "village-labels",permanent:true,direction:"center"});
                // console.log("Tooltip : ",tooltip.getTooltip())
                new_viewer.addTo(container as HTMLDivElement)
                new_viewer.show(this.getViewerDataOfVill(feature))
                this.pieCNT[feature.properties["VILLNAME"]] = {
                    Tooltip: tooltip,
                    CNT : container,
                    Viewer : new_viewer
                }
            }
            else {
                layer.bindTooltip(feature.properties["VILLNAME"],{className: "village-labels",permanent:true,direction:"center"});
            }
            
        }
    }

    onAdd(map: L.Map): this {
        
        this.geojsonLayer.addTo(map);
        if(this.showPop)
            this.populationBox.addTo(map);
        return this;
    }

    onRemove(map: L.Map): this {
        if(this.showPop)
            this.populationBox.close();
        if(this.showPop)
            this.populationBox.remove();
        this.geojsonLayer.remove();
        if(this.showOnMap) {
            for(let villname in this.pieCNT)
            {
                this.pieCNT[villname].Tooltip.remove()
            }
        }
        return this;
    }

}

export class VillageLayersSubGroup extends L.Layer {
    private layerControl : L.Control;
    private layers;
    constructor(geojsonData:GeoJSON.GeoJsonObject,populationData:PopulationDataType,color:string = "red",highlightColor: string = "orange",showPop: boolean = true,showOnMap:boolean = false)
    {
        super()
        this.layers = {
            總人口 : new VillageLayer(geojsonData,this.getFemaleMalePopData(populationData),color,highlightColor,showPop,showOnMap),
            // 男女比 : new VillageLayer(geojsonData,this.getFemaleMalePopData(populationData),color,this.highlightColor,true),
            國籍比 : new VillageLayer(geojsonData,populationData,color,highlightColor,showPop,showOnMap),
        } as {[name:string]:VillageLayer};
        this.layerControl = L.control.layers(this.layers,undefined,{collapsed: false,sortLayers: false,position:"bottomright"})
    }

    private getFemaleMalePopData = (populationData:PopulationDataType) => {
        let rtv : PopulationDataType = {}
        for(let villname in populationData)
        {
            let popData = populationData[villname].population;
            let totalFemale = 0;
            let totalMale = 0;
            for(let label in popData)
            {
                totalFemale += popData[label].female
                totalMale += popData[label].male
            }
            rtv[villname] = {
                latitude: populationData[villname].latitude,
                longtitude:  populationData[villname].longtitude,
                population: {
                    總人口:{
                        female: totalFemale,
                        male: totalMale
                    }
                } 
            }
        }
        return rtv;
    }

    onAdd(map: L.Map): this {
        this.layerControl.addTo(map);
        this.layers.國籍比.addTo(map);
        return this;
    }

    onRemove(map: L.Map): this {
        this.layerControl.remove()
        for(let layer in this.layers)
            this.layers[layer].remove()
        return this;
    }
}


export class VillageLayersGroup extends L.Layer {
    private layerControl : L.Control;
    private layers;
    constructor(geojsonData:GeoJSON.GeoJsonObject,populationData:PopulationDataType,color:string = "red",highlightColor: string = "orange")
    {
        super()
        this.layers = {
            顯示在地圖上 : new VillageLayersSubGroup(geojsonData,populationData,color,highlightColor,false,true),
            // 男女比 : new VillageLayer(geojsonData,this.getFemaleMalePopData(populationData),color,this.highlightColor,true),
            顯示在資訊欄 : new VillageLayersSubGroup(geojsonData,populationData,color,highlightColor,true,false),
        } as {[name:string]:VillageLayersSubGroup};
        this.layerControl = L.control.layers(this.layers,undefined,{collapsed: false,sortLayers: false,position:"bottomright"})
    }

    onAdd(map: L.Map): this {
        this.layerControl.addTo(map);
        this.layers.顯示在地圖上.addTo(map);
        return this;
    }

    onRemove(map: L.Map): this {
        this.layerControl.remove()
        for(let layer in this.layers)
            this.layers[layer].remove()
        return this;
    }
}

export default VillageLayersGroup;