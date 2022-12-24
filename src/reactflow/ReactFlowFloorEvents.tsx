import { useCallback, useState, useRef } from "react";
import { useNodesState } from "reactflow";
import { useEdgesState } from "reactflow";
import * as t from "../tools/LeerTools.tsx";

const ReactFlowFloorEvents = () => {
  const [nodeClicked, setNodeClicked] = useState({});
  const [selectedFloor, setSelectedFloor] = useState(
    t.getSesMemObj("SelectedFloor")
  );
  const [currentAreas, setCurrentAreas] = useState({});
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const removeNode = useCallback(
    (node: { id: any }) => {
      setNodes((nds: any[]) =>
        nds.filter((nde: { id: any }) => nde.id != node.id)
      );
    },
    [nodes]
  );

  const removeEdge = useCallback(
    (edge: { id: any }) => {
      setEdges((edg: any[]) =>
        edg.filter((edg: { id: any }) => edg.id != edge.id)
      );
    },
    [edges]
  );
  return {
    nodeClicked,
    setNodeClicked,
    selectedFloor,
    setSelectedFloor,
    currentAreas,
    setCurrentAreas,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    removeNode,
    removeEdge,
  };
};

export default ReactFlowFloorEvents;

// Node & Edge tool functions
