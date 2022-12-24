import React from "react";
import { getBezierPath, addEdge, Handle, Position } from "reactflow";
import "../index.css";
import { edgeTypes } from "./ReactFlowFloorEdgeTypes";
import t from "../tools/LeerTools.tsx";
import {  } from "reactflow";

/////////////////////////
///////Edge methods//////
/////////////////////////

export const addBaseEdge = (props,onEdgeDelete,edges) => {
	const edge = {
	id: props.data.id,
	 type:"buttonedge",
	 sourceHandle:null,
	 targetHandle:null,
	 source: ""+props.source,
	 target: ""+props.target,
	 data: {...props.data, onEdgeDelete:onEdgeDelete},
	}
	return addEdge(edge,edges);
  };
