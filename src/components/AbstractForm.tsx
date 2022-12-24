// import t from "../infrastructuur/LeerTools";
import React, { useState } from "react";

export default abstract class AbstractForm {
  id: "0";
  table:string;
  constructor(props, table) {
    if (props?.id) this.id = props.id;
    this.table=table;
  }

  ThisUseState = (varName, setName, value) => {
    const tmp = useState(value);
    this[varName] = tmp[0];
    this[setName] = tmp[1];
  };

  CopyPropsToThis = (obj: Object) => {
    for (const [key, value] of Object.entries(obj)) {
      this[key] = value;
      console.log(`${key}: ${value}`);
    }
  };
}
