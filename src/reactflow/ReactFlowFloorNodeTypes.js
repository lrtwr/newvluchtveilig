import React from "react";
import { Handle, Position } from "reactflow";
import trap from "./stairs.png";

const dragHandleStyle = {
  display: "inline-block",
  position: "relative",
  width: 12,
  height: 8,
  top: -16,
  left: -5,
  backgroundColor: "black",
  marginLeft: 5,
  borderRadius: "50% 50% 0% 0%",
};

const deleteHandleStyle = {
  display: "block",
  position: "absolute",
  width: 12,
  height: 8,
  top: -8,
  left: 108,
  backgroundColor: "red",
  marginLeft: 5,
  borderRadius: "50% 50% 0% 0%",
  border: "1px solid black",
};

const stairsHandleStyle = {
  display: "block",
  position: "absolute",
  width: 17,
  height: 14,
  backgroundColor: "white",
  marginLeft: 5,
  border: "1px solid black",
};

const upperStairsHandleStyle = {
  ...stairsHandleStyle,
  top: -14,
  left: 0,
  borderRadius: "50% 50% 0% 0%",
};

const stairAreaName ={
  display: "block",
  position: "absolute",
  // backgroundColor: "white",
  color: "black",
  margin: "0px",
  padding: "0px",
  left: 6
}
const upperAreaName ={
  ...stairAreaName,
  top:-35,
  width:160
}
const lowerAreaName ={
  ...stairAreaName,
  top:85,

}
const lowerStairsHandleStyle = {
  ...stairsHandleStyle,
  top: 73,
  left: 0,
  borderRadius: "0% 0% 50% 50%",
};

const titleStyle = {
  // display: "",
  // alignItems: "center",
  backgroundColor: "green",
  color: "blue",
};

const sourceHandle = { width: 11, height: 11 };

const targetHandle = {
  width: 11,
  height: 11,
};

const inputNode = ({ data }) => {
  return (
    <>
      <Handle
        // id="ls"
        type="target"
        style={sourceHandle}
        position={Position.Left}
        color={"red"}
        // onConnect={onConnect}
        // style={{}}
      />
      <Handle
        // id="rs"
        type="source"
        style={targetHandle}
        position={Position.Right}
        // onConnect={onConnect}
        // style={{}}
      />
      {/* <span className="custom-drag-handle" style={dragHandleStyle} /> */}
      <span
        className=""
        style={deleteHandleStyle}
        onClick={() => data?.onNodeDelete()}></span>
      {data.isHidden && (
        <>
          
          <img
            src={trap}
            loading="lazy"
            onClick={() => data?.onUpperAreaConnectStart()}
            style={{ ...upperStairsHandleStyle }}
          />
          <span onClick={() => data?.onUpperAreaConnectStart()} style={upperAreaName}>{data.upperAreaName}</span>
        </>
      )}
    
      <div>
        <span className={titleStyle}>{data?.title}</span>
        <br />
        id: {data?.id}
        <br />
        name: {data?.name}
      </div>
      {data.isHidden && (
        <>
          <img
            src={trap}
            loading="lazy"
            onClick={() => data?.onLowerAreaConnectStart()}
            style={{ ...lowerStairsHandleStyle }}
          />
                    <span onClick={() => data?.onLowerAreaConnectStart()}
                    style={lowerAreaName}>{data.lowerAreaName}</span>
        </>
      )}
    </>
  );
};

export const nodeTypes = {
  inputNode: inputNode,
};
