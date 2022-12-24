import React, { useState, useEffect } from "react";
import * as t from "../tools/LeerTools.tsx";
import {
  ApiSelect,
  ArraySelect,
  ApiFilterSelect,
} from "../tools/LeerSelect.tsx";
import staticTables from "../services/staticTables.json";

export function SelectCompany(props) {
  const newProps = {
    model: props["model"],
    foreignKey: "company",
    disabled: true,
    labelFieldName: "name",
    valueFieldName: "id",
    placeHolder: "Kies een Bedrijf",
    onChange: props.onChange,
  };
  return ApiSelect(newProps);
}

export function SelectBuilding(props) {
  const newProps = {
    model: props["model"],
    foreignKey: "building",
    disabled: true,
    labelFieldName: "name",
    valueFieldName: "id",
    placeHolder: "Kies een Gebouw",
    onChange: props.onChange,
  };
  return ApiSelect(newProps);
}

export function SelectFromArea(props) {
  const newProps = {
    model: props?.model,
    foreignKey: "from_area",
    disabled: true,
    tableName: "area",
    labelFieldName: "name",
    valueFieldName: "id",
    placeHolder: "Kies een ruimte",
    onChange: props.onChange,
  };
  return ApiSelect(newProps);
}

export function SelectToArea(props) {
  const newProps = {
    model: props["model"],
    foreignKey: "to_area",
    tableName: "area",
    disabled: true,
    labelFieldName: "name",
    valueFieldName: "id",
    placeHolder: "Kies een ruimte",
    onChange: props.onChange,
  };
  return ApiSelect(newProps);
}

export function SelectUpperStairArea(props) {
  const disabled = props.disabled ? props.disabled : false;
  let filterText: any;
  if (props?.defaultValues?.lower_stair_area?.floor?.floornumber!=undefined&& !disabled)
{  
 
  filterText =
      "(row)=>row.areatype_id===3"+
      "&&row.floor.building.id==="+props.defaultValues.lower_stair_area.floor.building.id+
      "&&row.floor.floornumber===" +(props.defaultValues.lower_stair_area.floor.floornumber + 1);}
  const newProps = {
    model: props?.model,
    foreignKey: "upper_stair_area",
    tableName: "stair",
    disabled: disabled,
    labelFieldName: "name",
    filterText: filterText,
    valueFieldName: "id",
    defaultValue: props?.defaultValue,
    placeHolder: "Kies een trap ruimte",
    onChange: props.onChange,
  };
  return ApiFilterSelect(newProps);
}

export function SelectLowerStairArea(props) {
  const disabled = props.disabled ? props.disabled : false;
  let filterText: any;
  if (props?.defaultValues?.upper_stair_area?.floor?.floornumber !=undefined && !disabled)
{    filterText =
      "(row)=>row.areatype_id===3"+
      "&&row.floor.building.id==="+props.defaultValues.upper_stair_area.floor.building.id+
      "&&row.floor.floornumber==="+(props.defaultValues.upper_stair_area.floor.floornumber - 1);}

  const newProps = {
    model: props["model"],
    foreignKey: "lower_stair_area",
    disabled: disabled,
    labelFieldName: "name",
    tableName: "stair",
    valueFieldName: "id",
    defaultValue: props?.defaultValue,
    filterText: filterText,
    placeHolder: "Kies een trap ruimte",
    onChange: props.onChange,
  };
  return ApiFilterSelect(newProps);
}

export function SelectFloor(props) {
  const newProps = {
    model: props?.model,
    foreignKey: "floor",
    tableName: "floor",
    labelFieldName: "name",
    valueFieldName: "id",
    defaultValue: props?.defaultValue,
    placeHolder: "Kies een verdieping",
    onChange: props.onChange,
  };
  return ApiSelect(newProps);
}

export function SelectEscapeRouteType(props) {
  props = { ...props };
  props.optionsArray = staticTables.escaperoutetype;
  props.labelFieldName = "name";
  props.valueFieldName = "id";
  props.foreignKey = "escaperoutetype_id";
  return ArraySelect(props);
}

export function SelectStairAreaType(props) {
  props = { ...props };
  props.optionsArray = staticTables.stairsareatype;
  props.labelFieldName = "name";
  props.valueFieldName = "id";
  props.foreignKey = "stairareatype_id";
  return ArraySelect(props);
}

export function SelectAreaType(props) {
  props = { ...props };
   props.disabled = true;
  props.optionsArray = staticTables.areatype;
  props.labelFieldName = "name";
  props.valueFieldName = "id";
  props.foreignKey = "areatype_id";
  return ArraySelect(props);
}

export function SelectDoorType(props) {
  props = { ...props };
  props.optionsArray = staticTables.doortype;
  props.labelFieldName = "name";
  props.valueFieldName = "id";
  props.foreignKey = "doortype_id";
  return ArraySelect(props);
}

export function SelectStairsCapacityType(props) {
  props = { ...props };
  props.optionsArray = staticTables.stairscapacitytype;
  props.labelFieldName = "name";
  props.valueFieldName = "id";
  props.foreignKey = "stairscapacitytype_id";
  return ArraySelect(props);
}

export function SelectStairsHeightType(props) {
  props = { ...props };
  props.optionsArray = staticTables.stairsheighttype;
  props.labelFieldName = "name";
  props.valueFieldName = "id";
  props.foreignKey = "stairsheighttype_id";
  return ArraySelect(props);
}
