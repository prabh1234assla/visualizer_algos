import * as d3 from "d3";
import { D3NodeInit, LinkInit } from "../types/Data";

export default function LinksHighlight(event: Event, state: "enter" | "leave", n: D3NodeInit){
    const ColorEnter = "#661F10", ColorLeave = "#E57B63";

    if(state == "enter"){
        (event.target as SVGElement).setAttribute("r", "12px");

        d3
        .selectAll("line")
        .attr("stroke", 
            d => (d as LinkInit).source.id == n.id || (d as LinkInit).target.id == n.id ? ColorEnter : ColorLeave
        );
    }

    if(state == "leave"){
        (event.target as SVGElement).setAttribute("r", "6px");

        d3
        .selectAll("line")
        .attr("stroke", 
            ColorLeave
        );
    }
}