import React, { useState } from "react";
import Select from "react-select";
import * as t from "./LeerTools.tsx";
import { useAsyncGetAll } from "./useAsync";

export const ArraySelect = (props) => {
  props = { ...props };
  props.isNew =(props?.model&&(props?.model?.id==0||Object.keys(props?.model).length===0));
  props.defaultId=-1;
  props.currentId=-1;
  props.currentId = props.model?.[props.foreignKey]
    ? props.model?.[props.foreignKey]
   :-1;
   
  if (props?.model && props?.model[props.foreignKey]) {
    const tmpArray = props.optionsArray.filter((model) => {
      return model.id === props.model[props.foreignKey];
    })[0];
    props.defaultValue = {
      label:
        tmpArray[props.labelFieldName] + " " + props.model[props.foreignKey],
      value: tmpArray[props.valueFieldName],
    };
  } else {
if(props?.defaultValues&&props?.defaultValues[props.foreignKey])
{
  props.defaultValue = {
    label: props.optionsArray[props.defaultValues[props.foreignKey]-1][props.labelFieldName],
    value: props.defaultValues[props.foreignKey],
  };
}
  }
  return defaultSelect(props);
};

export const defaultSelect = (props) => {
  props = { ...props };
  if (props.optionsArray) {
    const opts = props.optionsArray.map((d) => ({
      value: d[props.valueFieldName],
      label: d[props.labelFieldName] + " " + d?.id,
    }));
    props.options = opts;
  }
  return (
    <>
      <Select
        isDisabled={props.disabled}
        id={props.id}
        className={props.className}
        placeholder={props.placeholder}
        options={props.options}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    </>
  );
};

const createApiDefaultValue = (props) => {
  let ret = {};
  if (
    props.foreignKeyModel &&
    props.foreignKey &&
    props.labelFieldName &&
    props.valueFieldName
  ) {
    ret = {
      label: props.foreignKeyModel[props.labelFieldName],
      value: props.foreignKeyModel[props.valueFieldName],
    };
    return ret;
  }
};

export function ApiSelect(props) {
  props = { ...props };
  props.isNew =(props?.model&&(props?.model?.id==0||Object.keys(props?.model).length===0));
  props.defaultId=-1;
  props.currentId=-1;
  if(!props.foreignKey)props.foreignKey=props.tableName;

  props.currentId = props.model?.[props.foreignKey]
    ? props.model?.[props.foreignKey].id
   :-1;

  props.foreignKey = props.foreignKey ? props.foreignKey : props.tableName;
  props.foreignKeyModel = props.model?.[props.foreignKey]
    ? props.model?.[props.foreignKey]
    : props?.defaultValue;
  props.defaultValue = createApiDefaultValue(props);
  const [optionsArray, setOptionsArray] = useState([]);
  useAsyncGetAll(props.tableName,(response, error) => {
      setOptionsArray(response.data);
    });
  return defaultSelect({ ...props, optionsArray: optionsArray });
}

export function ApiFilterSelect(props) {
  props = { ...props };
  props.foreignKey = props.foreignKey ? props.foreignKey : props.tableName;
  props.foreignKeyModel = props.model?.[props.foreignKey]
    ? props.model?.[props.foreignKey]
    : props?.defaultValue;
  props.defaultValue = createApiDefaultValue(props);
  const [optionsArray, setOptionsArray] = useState([]);
  useAsyncGetAll( props.tableName,
     (response, error) => {
      // t.a(props.filterText)
      if(props.filterText)response.data=response.data.filter(eval(props.filterText));
      setOptionsArray(response.data);
    },
  );

  return defaultSelect({ ...props, optionsArray: optionsArray });
}