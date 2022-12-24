import * as t from "../tools/LeerTools.tsx"

const nodeBase = {
  fontSize: "14px",
  borderRadius: "5px",
  textAlign: "left",
  // border: "1px solid black",
  margin: 0,
  padding: 5,
  width: "130px",
}
export const sbcNodeg = {...nodeBase};
export const sbcNodep = {...nodeBase};
export const sbcNodeb = {...nodeBase, backgroundColor:'blue'};
export const sbcNodey = {...nodeBase};

export const createOneNode=(type, area, onNodeDelete,onUpperAreaConnectStart, onLowerAreaConnectStart )=>{
  let node={};
  switch (type) {
    case "SBC":
      node = addBaseNode(area,"SBC","bg-danger text-light",sbcNodeg,onNodeDelete,onUpperAreaConnectStart, onLowerAreaConnectStart,false)
      break;
    case "Doorgang":
      node =  addBaseNode(area,"Area","bg-warning text-dark", sbcNodey,onNodeDelete,onUpperAreaConnectStart, onLowerAreaConnectStart,false);
      break;
    case "Trap":
      node = addBaseNode(area,"Stairs","text-light", sbcNodeb,onNodeDelete,onUpperAreaConnectStart, onLowerAreaConnectStart,true);
      break;
    case "Exit":
      node = addBaseNode(area,"Exit","bg-success text-light", sbcNodep,onNodeDelete,onUpperAreaConnectStart, onLowerAreaConnectStart,false);
      break;
    default:
      return;
  }
  return node;
}

export const addBaseNode = (area,title,className,styleName,onNodeDelete,onUpperAreaConnectStart, onLowerAreaConnectStart,isHidden) => {
  var upperAreaName="Geen";
  var lowerAreaName="Geen";
  
  //lower en upper omdraaien.
  //Naar boven is de stairs gekoppeld aan de huidig area via de lower area. Aaan de upper_stair_area zit de upper area gekoppeld.
  //Puzzeltje, maar het klopt
  if(area?.lower_stair_area&&area?.lower_stair_area.length>0)upperAreaName=area.lower_stair_area[0].upper_stair_area.name;
  if(area?.upper_stair_area&&area?.upper_stair_area.length>0)lowerAreaName=area.upper_stair_area[0].lower_stair_area.name;
  
  const node = {
   id: ""+area.id,
  //  dragHandle: ".custom-drag-handle",
   type:"inputNode",
   data: {id:area.id,name:area.name, upperAreaName:upperAreaName,lowerAreaName:lowerAreaName,title:title, onNodeDelete:onNodeDelete,onLowerAreaConnectStart:onLowerAreaConnectStart,onUpperAreaConnectStart:onUpperAreaConnectStart,isHidden:isHidden},
   style: styleName ,
   className:className,
   position: {x:area.x,y:area.y},
  }
  return node;
};

