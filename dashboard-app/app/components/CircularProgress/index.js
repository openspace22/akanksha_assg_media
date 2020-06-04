import React, { useState, useEffect } from "react";
import "./style.scss";

const CircularProgress = ({
    progress
}) => {
    const [rendered,setRendered] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setRendered(true);
        },400);
    },[]);
    const radius = 80;
    const strokeWidth = 10;
    const actualRadius = radius - strokeWidth * 2
    const circumference = 2 * Math.PI * actualRadius;
    const strokeDashOffset = circumference - circumference * ( progress /100 );
    console.log("rendered===",rendered);
    console.log("progress==",progress);
    return (
        <div className = "circular-progress">
            <svg 
                height = { radius * 2} 
                width = { radius * 2}
            >
                <circle
                    fill = "transparent"
                    cx = { radius }
                    cy = { radius }
                    r = { actualRadius }
                    strokeWidth = { strokeWidth }
                    strokeDasharray = { circumference }
                    className="progress-base"
                ></circle>
                <circle
                    fill = "transparent"
                    cx = { radius }
                    cy = { radius }
                    r = { actualRadius }
                    strokeWidth = { strokeWidth }
                    strokeDasharray = { circumference }
                    style = {{strokeDashoffset: rendered ? strokeDashOffset : circumference}}
                ></circle>
            </svg>
            <div className="progress-count">{progress}%</div>
        </div>
    ) 
}
export default CircularProgress;