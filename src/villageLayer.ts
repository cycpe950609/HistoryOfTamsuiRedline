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

// class PieViewer {

//     private width : number;
//     private height : number;
//     private radius : number;
//     private x;// = d3.scaleLinear().range([0, 2 * Math.PI]);
//     private y;// = d3.scaleSqrt().range([0, radius]);
//     private color;
//     private data : d3.HierarchyNode<unknown>;
//     private svg : any;
//     constructor(width:number,height:number){
//         this.width = width;
//         this.height = height;
//         this.radius = Math.min(width,height)/2;
//         this.x = d3.scaleLinear().range([0, 2 * Math.PI]);
//         this.y = d3.scaleSqrt().range([0, this.radius]);
//         this.color = d3.scaleOrdinal(d3.schemeCategory10);
//         this.data = d3.hierarchy({
//             name: "root",
//             children: []
//         });
//     }

//     addTo = (CNT : HTMLDivElement) => {
//         this.svg = d3.select(CNT).append("svg")
//         .attr("width", this.width)
//         .attr("height", this.height)
//         .append("g")
//         .attr("transform", "translate(" + this.width / 2 + "," + (this.height / 2 + 10) + ")");
        
//     }

//     show = (data:PieViewerData) => {

//         let dataChild = []
//         for(let key in data.population){
//             dataChild.push({
//                 name: key,
//                 value: data.population[key]
//             })
//         }
//         let viewerData = {
//             name: data.areaName,
//             children: dataChild
//         }
//         this.data = d3.hierarchy({
//             "name": "flare",
//             "children": [
//              {
//               "name": "analytics",
//               "children": [
//                {
//                 "name": "cluster",
//                 "children": [
//                  {"name": "AgglomerativeCluster", "size": 3938},
//                  {"name": "CommunityStructure", "size": 3812},
//                  {"name": "MergeEdge", "size": 743}
//                 ]
//                },
//                {
//                 "name": "graph",
//                 "children": [
//                  {"name": "BetweennessCentrality", "size": 3534},
//                  {"name": "LinkDistance", "size": 5731}
//                 ]
//                }
//               ]
//              }
//             ]
//            }
//            );
//         // console.log("data : ",viewerData)
//         let root = this.data

//         let partition = d3.partition()(this.data)
//         console.log("partition : " , partition)

//         const click = (d) => {
//             node = d;
//             path.transition()
//                 .duration(1000)
//                 .attrTween("d", this.arcTweenZoom(d));
//           }

//         let arc = d3.arc()
//         .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, this.x(d.x))); })
//         .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, this.x(d.x + d.dx))); })
//         .innerRadius(function(d) { return Math.max(0, this.y(d.y)); })
//         .outerRadius(function(d) { return Math.max(0, this.y(d.y + d.dy)); });

//         var path = this.svg.datum(root).selectAll("path")
//         .data(partition.data)
//         .enter().append("path")
//         .attr("d", arc)
//         .style("fill", (d) => { return this.color((d.children ? d : d.parent).name); })
//         .on("click", click)
//         .each(this.stash);

//         // let that = this;
//         // d3.selectAll("input").on("change", function change() {
//         //     var value = (this as HTMLInputElement).value === "count"
//         //         ? function() { return 1; }
//         //         : function(d) { return d.size; };

//         //         path
//         //         .data(partition.value(value).nodes)
//         //         .transition()
//         //         .duration(1000)
//         //         .attrTween("d", that.arcTweenData);
//         // }
//         console.log("Test")
//     }
//     // Setup for switching data: stash the old values for transition.
//     private stash = (d) => {
//         d.x0 = d.x;
//         d.dx0 = d.dx;
//     }
//     // When switching data: interpolate the arcs in data space.
//     private arcTweenData = (a, i) => {
//         var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
//         function tween(t) {
//             var b = oi(t);
//             a.x0 = b.x;
//             a.dx0 = b.dx;
//             return arc(b);
//         }
//         if (i == 0) {
//         // If we are on the first arc, adjust the x domain to match the root node
//         // at the current zoom level. (We only need to do this once.)
//             var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
//             return function(t) {
//                 x.domain(xd(t));
//                 return tween(t);
//             };
//         } else {
//             return tween;
//         }
//     }   

//     // When zooming: interpolate the scales.
//     private arcTweenZoom = (d) => {
//         var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
//             yd = d3.interpolate(y.domain(), [d.y, 1]),
//             yr = d3.interpolate(y.range(), [d.y ? 20 : 0, this.radius]);
//         return function(d, i) {
//         return i
//             ? function(t) { return arc(d); }
//             : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
//         };
//     }
// }

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
    constructor(geojsonData:GeoJSON.GeoJsonObject,populationData:PopulationDataType,color:string = "red",highlighColor: string = "orange")
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
            onEachFeature : this.onEachFeature
        })
        this.populationBox = Message.messagebox({timeout: 0 });
        this.viewer = new PieViewer(200,250)
    }

    private geojsonData : GeoJSON.GeoJsonObject;
    private populationData:PopulationDataType;
    private color:string;
    private highlightColor:string;
    private geojsonLayer : L.GeoJSON;
    private populationBox : Messagebox;

    private viewer : PieViewer;

    private highlightFeature = (e:L.LeafletEvent) => {
        let layer = e.target;
        layer.setStyle({
            weight: 5,
            color: this.highlightColor,
            fillOpacity : 0.7
        });
        layer.bringToFront()

        this.populationBox.show(this.getInfoTextOfVill(e.target.feature) + "</br>")
        this.viewer.addTo(this.populationBox.getContainer() as HTMLDivElement)
        this.viewer.show(this.getViewerDataOfVill(e.target.feature))
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
                        rtv += `${key} : 女 ${this.populationData[name].population[key].female} 人 男 ${this.populationData[name].population[key].male} 人 ,`
                    }
                    return rtv;
                }
                infoText = `${villname} : ${getListOfVilla(villname)}`;
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
    }

    onAdd(map: L.Map): this {
        
        this.geojsonLayer.addTo(map);
        this.populationBox.addTo(map);
        
        return this;
    }

    onRemove(map: L.Map): this {
        this.populationBox.close();
        this.populationBox.remove();
        return this;
    }

}

export default VillageLayer;