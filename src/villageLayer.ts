import L, { FeatureGroup, geoJSON } from "leaflet"
import { PopulationDataType } from "./data/Population";
import { Messagebox } from "./main";
import * as Message from "./message.mjs";
import * as d3 from "d3"
import { uniqueId } from "lodash";

type PieViewerData = {
    "areaName" : string,
    "population" : {
        [citizenship:string]:{[gender:string]:number}
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
        this.color = d3.schemeCategory10;
    }

    addTo = (CNT : HTMLDivElement) => {
        this.svg = d3.select(CNT).append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("transform", "translate(" + this.width / 2 + "," + (this.height / 2 + 10) + ")");
        
    }

    show = (data:PieViewerData) => {
        let colorIndex = 0;
        this.data = data;
        const arc = d3
        .arc()
        .innerRadius(20)
        .outerRadius(this.radius)

        let pieData : PieDataType[] = []
        for(let citizen in data.population)
        {
            for(let gender in data.population[citizen]) {
                pieData.push({name:`${citizen}_${gender}`,value:data.population[citizen][gender]})
            }
        }
        const pie = d3.pie<PieDataType>().value(d => d.value)
        this.svg
        .selectAll('path')
        .data(pie(pieData))
        .enter()
        .append('g')
        .append('path')
        .attr('d', arc)
        .attr('fill', (d: any) => {let rtv = this.color[colorIndex]; colorIndex = (colorIndex + 1)%(this.color.length); return rtv; })

        this.svg.append("text").text(data.areaName).style("text-anchor", "middle")
    }
}

class MarkViewer {

    private width : number;
    private height : number;
    private radius : number;

    private container : HTMLDivElement;

    private color;
    constructor(width:number,height:number){
        this.width = width;
        this.height = height;
        this.radius = Math.min(width,height)/2;
        this.color = d3.schemeCategory10;
        this.container = document.createElement("div");
    }

    addTo = (CNT : HTMLDivElement) => {
        this.container = CNT;
    }

    show = (data:PieViewerData) => {
        let colorIndex = 0;
        let cnt = document.createElement("div");
        cnt.classList.add("color_viewer_container")
        for(let citizen in data.population)
        {
            for(let gender in data.population[citizen]) {
                const getColor = () => {let rtv = this.color[colorIndex]; colorIndex = (colorIndex + 1)%(this.color.length); return rtv; }
                let div = document.createElement("div");
                div.classList.add("color_viewer_item");
                let color_view = document.createElement("div");
                color_view.style.backgroundColor = getColor();
                color_view.style.height = "15px";
                color_view.style.width = "15px";
                color_view.style.border = "2px solid black";
                div.appendChild(color_view);
                let lbl = document.createElement("label");
                lbl.innerText = `${citizen} 與 ${gender} ，共 ${data.population[citizen][gender]} 人`;
                div.appendChild(lbl);
                cnt.appendChild(div);
            }
        }

        this.container.appendChild(cnt);
        
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
        this.colorviewer = new MarkViewer(200,250);
        this.showPop = showPop;
        this.showOnMap = showOnMap;
        this.viewerMode = "total"

        let min = 99999999999999;
        let max = 0;
        for(let location in populationData) {
            let totalPop = 0;
            for(let citizen in populationData[location].population){
                for(let gender in populationData[location].population[citizen]){
                    totalPop += populationData[location].population[citizen][gender];
                }
            }
            min = totalPop < min ? totalPop : min;
            max = totalPop > max ? totalPop : max;
        }
        this.minPopulation = min;
        this.MAXpopulation = max;
        // console.log(`min : ${this.minPopulation} , max : ${this.MAXpopulation}`)
        this.uuid = uniqueId();

        // Note : the following should at the end of constructor to prevent onEachFeature get undefined things
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

    private uuid : string;// prevent same name in mode selector

    private minPopulation : number;
    private MAXpopulation : number;

    private geojsonData : GeoJSON.GeoJsonObject;
    private populationData:PopulationDataType;
    private color:string;
    private highlightColor:string;
    private geojsonLayer : L.GeoJSON;
    private populationBox : Messagebox;
    private showPop: boolean;
    private showOnMap: boolean;

    private viewer : PieViewer;
    private colorviewer : MarkViewer;

    private viewerMode : string;

    private getTotalViewerDataOfVill = (data : PieViewerData) => {
        let mergeData : PieViewerData = {
            areaName: data.areaName,
            population: {}
        };
        for(let citizen in data.population)
        {
            let totalPop = 0;
            for(let gender in data.population[citizen])
                totalPop += data.population[citizen][gender]
            mergeData.population[citizen] = {"總人數" : totalPop}
        }

        return mergeData;
    }

    private getShowTypeSelector = (onChange : (value:string)=> void,defaultValue : string) => {
        let cnt = document.createElement("fieldset");
        cnt.classList.add("selector-cnt")

        let title = document.createElement("legend")
        title.innerText = "檢視模式:";
        cnt.appendChild(title);

        const createSelectorItem = (value:string,innerText: string, changeFunc : (value:string)=> void,checked: boolean = false) => {
            let selector = document.createElement("div");
            selector.classList.add("selector");
            let lbl = document.createElement("label")
            lbl.setAttribute("for",`${value}-${this.uuid}`);
            lbl.innerText = innerText;
            selector.appendChild(lbl);

            let input = document.createElement("input");
            input.setAttribute("type","radio");
            input.setAttribute("name",`showType-${this.uuid}`);
            input.setAttribute("id",`${value}-${this.uuid}`);
            input.setAttribute("value",value);
            input.checked = checked;
            input.onchange = () => changeFunc(value);
            selector.appendChild(input);

            return selector;
        }

        cnt.appendChild(createSelectorItem("total","總人數",onChange,defaultValue === "total"))
        cnt.appendChild(createSelectorItem("gender","男女比",onChange,defaultValue === "gender"))

        // cnt.innerHTML = `\
        // <legend>檢視模式:</legend>\
        // <div class="selector">\
        //     <label for="total">總人數</label>\
        //     <input type="radio" id="total" name="showType" value="total" checked>\
        // </div>\
        // <div class="selector">\
        //     <label for="gender">男女比</label>\
        //     <input type="radio" id="gender" name="showType" value="gender" ${() => onChange("gender")}>\
        // </div>\
        // `
        return cnt;
    }

    private updateMessageBox = (e:L.LeafletEvent) => {


        if(this.showOnMap || this.showPop) {
            this.populationBox.show(this.getInfoTextOfVill(e.target.feature) + "</br>")
            // this.populationBox.show("")
            
            let data = this.getViewerDataOfVill(e.target.feature)
            let viewData = this.viewerMode === "total" ? this.getTotalViewerDataOfVill(data) : data;

            const onChange = (value:string) => {
                
                console.log(`Change mode : ${value}`)
                this.viewerMode = value;
                if(this.showOnMap)
                {
                    this.geojsonLayer.remove()
                    // TODO : This is a hack to reload the geojson layer, needed to find a better way to update states
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
                                if(feature.properties["VILLNAME"] in this.populationData)
                                    return true;
                            return false;
                        }
                    })
                    this.geojsonLayer.addTo(this._map);
                }
                this.updateMessageBox(e);
            }
            if(this.showPop){
                this.viewer.addTo(this.populationBox.getContainer() as HTMLDivElement);
                this.viewer.show(viewData)
            }
            (this.populationBox.getContainer() as HTMLDivElement).appendChild(this.getShowTypeSelector(onChange,this.viewerMode)) 
            this.colorviewer.addTo(this.populationBox.getContainer() as HTMLDivElement);
            this.colorviewer.show(viewData);
        }
    }

    private lastFeature = {};
    private highlightFeature = (e:L.LeafletEvent) => {
        if(e === this.lastFeature)
            return;
        this.lastFeature = e;
        // console.log("Highlight")
        let layer = e.target;
        layer.setStyle({
            weight: 5,
            color: this.highlightColor,
            fillOpacity : 0.7
        });
        layer.bringToFront()

        this.updateMessageBox(e);

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
                        rtv += `${key} : `
                        for(let gender in this.populationData[name].population[key])
                            rtv += `${gender} ${this.populationData[name].population[key][gender]} 人, `
                        rtv += "</br>"
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
                    for(let gender in popData[label])
                        totalPop += popData[label][gender]
                }
                // console.log("TotalPop : ",Math.log10(totalPop)*10)
                let ratio = (totalPop - this.minPopulation) / (this.MAXpopulation - this.minPopulation);
                let szPie = ratio*100 + 50;
                // console.log(`ratio : ${ratio} , szPie : ${szPie}`)
                let new_viewer = new PieViewer(szPie,szPie + 50);
                let tooltip = layer.bindTooltip(container,{className: "village-labels",permanent:true,direction:"center"});
                // console.log("Tooltip : ",tooltip.getTooltip())
                new_viewer.addTo(container as HTMLDivElement)
                let data = this.getViewerDataOfVill(feature);
                // console.log("ViewerMode",this.viewerMode);
                new_viewer.show(this.viewerMode === "total" ? this.getTotalViewerDataOfVill(data): data )
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
        if(this.showPop || this.showOnMap)
            this.populationBox.addTo(map);
        if(this.showOnMap){
            this.populationBox.show("");
            this.populationBox.getContainer()?.appendChild(this.getShowTypeSelector((value:string)=>{
                this.viewerMode = value;
                
                //====================================================================================================
            },"total"))
            // this.colorviewer.addTo(this.populationBox.getContainer() as HTMLDivElement);
            // this.colorviewer.show(this.getViewerDataOfVill(this.geojsonData))
        }
        return this;
    }

    onRemove(map: L.Map): this {
        if(this.showPop || this.showOnMap)
            this.populationBox.close();
        if(this.showPop || this.showOnMap)
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
                totalFemale += popData[label].女性 //is there general way ?
                totalMale += popData[label].男性
            }
            rtv[villname] = {
                latitude: populationData[villname].latitude,
                longtitude:  populationData[villname].longtitude,
                population: {
                    總人口:{
                        女性: totalFemale,
                        男性: totalMale
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