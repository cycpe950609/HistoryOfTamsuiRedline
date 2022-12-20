import { redlineData } from "./data/RedLineInfo";
import * as  TimeLineSlider  from "./timeline.mjs";

export type MapTimelinePropsType = {
    activeColor? : string;
    changeMap? : (param : {label: string, value : number, map: L.Map})=>void;
    initValue? : number;
}

const MapTimeline = (props : MapTimelinePropsType) => {
    let timelist = ["Hide"]
    // let timelist = []
    let timeKey: keyof typeof redlineData;
    for (timeKey in redlineData)
        timelist.push(timeKey)
    
    return TimeLineSlider.timelineSlider({
        timelineItems : timelist,
        position: 'bottomleft',
        labelWidth: "40px",
        activeColor: props.activeColor !== undefined ? props.activeColor : "#37adbf",
        changeMap : (typeof props.changeMap === "function") ? props.changeMap : (param : {label: string, value : number, map: L.Map}) {
            console.log("Change Map at ", param.label , param.value , param.map)
        },
        initValue : props.initValue !== undefined ? props.initValue : 1,
    })
}

export default MapTimeline;