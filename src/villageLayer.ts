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

class VillageLayer extends L.Layer {
    constructor(geojsonData:GeoJSON.GeoJsonObject,populationData:PopulationDataType,color:string = "red",highlighColor: string = "orange",showPop: boolean = true)
    {
        super()
        this.geojsonData = geojsonData;
        this.populationData = populationData;
        this.color = color;
        this.highlightColor = highlighColor;
        let style = {
            "color" : this.color,
            "weight" : 5,
            "opacity": 0.65
        }
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
        this.populationBox = Message.messagebox({timeout: 0 });
        this.viewer = new PieViewer(200,250)

        this.showPop = showPop;
    }

    private geojsonData : GeoJSON.GeoJsonObject;
    private populationData:PopulationDataType;
    private color:string;
    private highlightColor:string;
    private geojsonLayer : L.GeoJSON;
    private populationBox : Messagebox;
    private showPop: boolean;

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


    private onEachFeature = (feature: GeoJSON.Feature, layer : L.Layer) =>
    {
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlightFeature,
        })
        if(feature.properties)
        {
            layer.bindTooltip(feature.properties["VILLNAME"],{className: "village-labels",permanent:true,direction:"center"});
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
        return this;
    }

}

export default VillageLayer;