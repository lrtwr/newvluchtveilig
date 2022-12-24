import React from "react";
import { getBezierPath } from "reactflow";
import deur from "./deur.png";

const deleteHandleStyle = {
  display: "inline-block",
  position: "relative",
  width: 12,
  height: 8,
  top:66,
  // left: 88,
  left: 150,
  backgroundColor: "red",
  marginLeft: 5,
  borderRadius: "50% 50% 0% 0%",
  border: "1px solid black",
};

const deurTitleStyle = {
  display: "block",
  position: "relative",
  backgroundColor: "rgba(0, 0, 0, 0)",
  width: 160,
  // height: 180,
  top: 50,
  left: 130,
  margin: 5,
};

export const edgeTypes = {
  buttonedge: CustomEdge,
  // smart: SmartBezierEdge,
};
const foreignObjectHeight = 200;
const foreignObjectWidth = 300;

const onEdgeDoubleClick = (evt, id) => {
  evt.stopPropagation();
  alert(`delite ${id}`);
};

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data = { id: 99999999, name: "Geen doorname doorgegeven."  },
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={{}}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectWidth}
        height={foreignObjectHeight}
        x={labelX - foreignObjectWidth / 2}
        y={labelY - foreignObjectHeight / 2}>
                {/* <span
        className=""
        style={deleteHandleStyle}
        onClick={() => data?.onEdgeDelete()}></span> */}
        <img
          style={{
            opacity: 1,
            fontSize: 8,
            left: 135,
            top: 60,
            alt:"deur",
            display: "block",
            position: "relative",
          }}
          src={deur}
          width="33"
            loading="lazy"
        />

        <div style={deurTitleStyle}>
          <small>
            <b>{data?.name}</b>
          </small>
        </div>
      </foreignObject>
    </>
  );
}
