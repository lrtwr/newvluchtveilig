import React, { useEffect, useState } from "react";
import { useAsyncGetAll } from "../tools/useAsync";
import * as t from "../tools/LeerTools.tsx";

//// Ook in de variabelen is alles teruggerekend naar 30 seconden
export default function ReactFlowFloorReport(props) {
  const resFloor = useAsyncGetAll("floor");
  const resArea = useAsyncGetAll("area");
  const resStair = useAsyncGetAll("stair");
  const resDoor = useAsyncGetAll("door");

  const [floors, setFloors] = useState([ ...resFloor.data ]);
  const [areas, setAreas] = useState([ ...resArea.data ]);
  const [stairs, setStairs] = useState([ ...resStair.data ]);
  const [doors, setDoors] = useState([ ...resDoor.data ]);

  useEffect(() => {
    if(!resFloor.isLoaded)return
    if(!resArea.isLoaded)return
    if(!resDoor.isLoaded)return
    if(!resStair.isLoaded)return
    t.c(areas[0])
    //Expand objects with calculation properties.
    t.connectOneToManyJSObjects(floors, areas, "area");
    t.connectOneToManyJSObjects(areas, doors, "from_area");
    t.connectOneToManyJSObjects(areas, doors, "to_area");

    t.connectOneToManyJSObjects(areas, stairs, "upper_stair_area");
    t.connectOneToManyJSObjects(areas, stairs, "lower_stair_area");

    t.reConnectManyToOneJSObjects(areas,floors,"area");
    t.reConnectManyToOneJSObjects(doors, areas, "from_area");
    t.reConnectManyToOneJSObjects(doors, areas, "to_area");

    t.reConnectManyToOneJSObjects(stairs, areas,  "upper_stair_area");
    t.reConnectManyToOneJSObjects(stairs, areas,  "lower_stair_area");





    

    expandFloorObjects(setFloors);
    expandAreaObjects(setAreas);
    expandStairObjects(setStairs);
    expandDoorObjects(setDoors);

    //set capacity after 0 seconds include return percentage per door and stairs.
    setFloorsSituationAtSecond0(setFloors);
    setAreasSituationAtSecond0(setAreas);
    setStairsSituationAtSecond0(setStairs);
    setDoorsSituationAtSecond0(setDoors);

    /////////////////////////////////////////////////////////////////////
    //Iterate next procedure every seconds until the building is empty.//
    /////////////////////////////////////////////////////////////////////

    //Floor is totalisation of other calculations. Overcapacity is depending on stairs.
    moveToNextFloor(setFloors);

    //Move to other areas through doors.
    moveToNextAreaThroughDoors(setAreas);

    //Move to other areas through stairs.
    moveToNextAreaThroughStairs(setAreas);

    //Now a situation is created that practically impossible
    //Areas can be overcrowded.
    //Calculate the overcapicity.
    calculateOverCapacityPerArea(setAreas);

    //Move overcapacity back to previous areas depending on
    //overCapacityReturnPercentage property in the doors and stairs.
    //this is the amount of people not moved.
    //this creates a red flag
    moveOverCapacityBackToAreas();

    // Next iteration loop until building is empty.
    // End iteration

    createHTMLReport();
  },[resFloor.isLoaded,resArea.isLoaded,resDoor.isLoaded,resStair.isLoaded]);



  return (
    <>
      <h1>Het Rapport</h1>
    </>
  );

}

//Expand data objects with calculation properties
const expandFloorObjects = (setFloors) => {
  // setFloors((floors)=>{
  //     floors.map((door)=>{
  //         //per 30 sec
  //         door.totalCurrentCapacity=[];
  //         door.totalOverCapacityReturned=[];
  //     })
  // })
};
const expandAreaObjects = (setAreas) => {
  // setAreas((areas)=>{
  //     areas.map((area)=>{
  //         area.surfaceCapacity=0;
  //         area.totalLeavingCapacity=0;
  //         area.totalEnteringCapacity=0;
  //         //per 30 sec
  //         area.currentSurfaceCapacity=[];
  //         area.overCapacityReturned=[];
  //     })
  // })
};
const expandStairObjects = (setStairs) => {
  // setStairs((stairs)=>{
  //     stairs.map((stair)=>{
  //         stair.maxSurfaceCapacity=0;
  //         stair.maxPassingCapacity=0;
  //         stair.overCapacityReturnPercentage=0;
  //         //per 30 sec
  //         stair.currentSurfaceCapacity=[];
  //         stair.overCapacityReturned=[]
  //     })
  // })
};
const expandDoorObjects = (setDoors) => {
  // setDoors((doors)=>{
  //     doors.map((door)=>{
  //         door.maxPassingCapacity=0;
  //         door.overCapacityReturnPercentage=0;
  //     })
  // })
};

/// Set situation after 0 Seconds
const setFloorsSituationAtSecond0 = (setFloors) => {};

const setAreasSituationAtSecond0 = (setAreas) => {};

const setStairsSituationAtSecond0 = (setStairs) => {};

const setDoorsSituationAtSecond0 = (setDoors) => {};

const moveToNextFloor = (setFloors) => {};

const moveToNextAreaThroughDoors = (setAreas) => {};

//Move to other areas through stairs.
const moveToNextAreaThroughStairs = (setAreas) => {};

//Now a situation is created that practically impossible
//Areas can be overcrowded.
//Calculate the overcapicity.
const calculateOverCapacityPerArea = (setArea) => {};

//Move overcapacity back to previous areas depending on
//overCapacityReturnPercentage property in the doors and stairs.
//this is the amount of people not moved.
//this creates a red flag
const moveOverCapacityBackToAreas = () => {};

// Next iteration loop until building is empty.
// End iteration
const createHTMLReport = () => {};
