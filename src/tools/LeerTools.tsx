import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";

  export const c=(
    item1,
    item2 = undefined,
    item3 = undefined,
    item4 = undefined,
    item5 = undefined,
    item6 = undefined
  )=>{
    let text = JSON.stringify(item1);
    if (item2) text += "    " + JSON.stringify(item2);
    if (item3) text += "    " + JSON.stringify(item3);
    if (item4) text += "    " + JSON.stringify(item4);
    if (item5) text += "    " + JSON.stringify(item5);
    if (item6) text += "    " + JSON.stringify(item6);
    console.log(JSON.stringify(text));
    return text
  }

  export const promiseAllAsync=(arr=[])=>{
    if(arr.length>0){
      const pr = arr.shift();
      pr().then(()=>promiseAllAsync(arr));
    }
  }

  export const a=(
    item1,
    item2 = undefined,
    item3 = undefined,
    item4 = undefined,
    item5 = undefined,
    item6 = undefined
  )=> {alert(c(item1,item2,item3,item4,item5,item6))}
  export const setSesMemObj = (item, obj) => {
    sessionStorage.setItem(item, JSON.stringify(obj));
  };

  export const getSesMemObjItem = (item, prop) => {
    if (sessionStorage.getItem(item) != null) {
      var even1 = sessionStorage.getItem(item);
      var even2 = JSON.parse(even1);
      if (even2[prop] != null) {
        return even2[prop];
      }
    }
  };

  export const getId = () => `dndnode_${Math.round(Math.random() * 1000000)}`;
  export const getSesMemObj = (item) => {
    if (sessionStorage.getItem(item) != null) {
      return JSON.parse(sessionStorage.getItem(item));
    }
  };

  export const getSesMemArr = (item) => {
    if (sessionStorage.getItem(item) != null) {
      const arr = JSON.parse(sessionStorage.getItem(item));
      return arr;
    }
    return [];
  };

  export const addSesMemArr = (arrName, arrObj) => {
    let arr = getSesMemArr(arrName);
    if (arr != null) arr.push(arrObj);
    else arr = [arrObj];
    setSesMemObj(arrName, arr);
  };

export const setObjectProp = (obj, prop, value) => {
  if (!obj[prop]) obj[prop] = value;
};

export const replObjProps = (obj, addObj) => {
  const keys = Object.keys(addObj);
  keys.forEach((key) => {
    obj[key] = addObj[key];
  });
};

export const setObjectProps = (obj, addObj) => {
  const keys = Object.keys(addObj);
  keys.forEach((key) => {
    if (!obj[key]) obj[key] = addObj[key];
  });
};

export function FormTextError(props) {
  const errors = props.errors;
  let field = errors[props.fieldName];
  let bericht;
  if (field) bericht = field.message;
  if (props.errorMessage) bericht = props.errorMessage;

  return (
    <>
      {field && (
        <>
          <Form.Text className="">
            <b>
              <div style={{ color: "red" }}>{bericht}</div>
            </b>
          </Form.Text>
        </>
      )}
      {!field && (
        <>
          <Form.Text className="">{props.children}</Form.Text>
        </>
      )}
    </>
  );
}

export interface DynamicObject {
  [k: string]: any;
}

export class DynamicClass<T> {
  [k: string]: T
}
export class JSONDatabase extends DynamicClass<any> {
  constructor(public baseArray: any[] = [], aProp: string[] = []) {
    super();
    if (baseArray.length > 0 && aProp.length == 0) aProp = Object.keys(baseArray[0]);
    if (baseArray.length > 0 && aProp.length > 0) {
      if (!aProp) aProp = Object.keys(baseArray[0]);
      this["_keys"] = [];
      aProp.forEach(prop => {
        this["_keys"].push(prop);
        if (!this[prop]) this[prop] = new DynamicClass<string>();

        baseArray.forEach(obj => {
          if (!this[prop]["_keys"]) this[prop]["_keys"] = [];
          if (this[prop]["_keys"].indexOf(obj[prop]) == -1) this[prop]["_keys"].push(obj[prop]);
          if (!this[prop][obj[prop]]) this[prop][obj[prop]] = new DynamicClass<string>();
          if (!this[prop][obj[prop]]["_array"]) this[prop][obj[prop]]["_array"] = [];
          this[prop][obj[prop]]["_array"].push(obj);
          this[prop][obj[prop]]["_keys"] = [];

          aProp.forEach(prop2 => {
            this[prop][obj[prop]]["_keys"].push(prop2);

            if (prop2 != prop) {
              if (!this[prop][obj[prop]][prop2]) this[prop][obj[prop]][prop2] = new DynamicClass<string>();

              baseArray.forEach(obj2 => {
                if (obj2 == obj) {
                  if (!this[prop][obj[prop]][prop2]["_keys"]) this[prop][obj[prop]][prop2]["_keys"] = [];
                  if (this[prop][obj[prop]][prop2]["_keys"].indexOf(obj2[prop2]) == -1) this[prop][obj[prop]][prop2]["_keys"].push(obj2[prop2]);
                  if (!this[prop][obj[prop]][prop2][obj2[prop2]]) this[prop][obj[prop]][prop2][obj2[prop2]] = new DynamicClass<string>();
                  if (!this[prop][obj[prop]][prop2][obj2[prop2]]["_array"]) this[prop][obj[prop]][prop2][obj2[prop2]]["_array"] = []
                  this[prop][obj[prop]][prop2][obj2[prop2]]["_array"].push(obj2);
                }
              })
            }
          })
        });
      });
    }
  }

  ["get"] = (searchArray: string[]) => {
    let obj: any = this;
    for (let key of searchArray) {
      if (obj[key]) {
        obj = obj[key];
      }
      else {
        obj = null;
        break;
      }
    }
    return obj;
  }
  ["exist"] = (searchArray: string[]) => {
    return this["get"](searchArray) != null ? true : false;
  }
}

export const reConnectManyToOneJSObjects=(manyTable:[],oneTable:[],foreignKey:string)=>{
  manyTable.forEach((manyRecord)=>{ 
    const foreignKeyRecord = oneTable.filter((oneRecord)=>oneRecord.id===manyRecord.id);
    manyRecord=Object.assign(manyRecord,foreignKeyRecord[0])
  })
}

export function connectOneToManyJSObjects(oneTable:Object[]=[],manyTable:Object[]=[],manyTableField:string){
  oneTable.forEach((oneRecord)=>{
    let DObject:DynamicObject ={}
    DObject[manyTableField]=[];
    oneRecord=Object.assign(oneRecord, DObject);
    manyTable.forEach((manyRecord)=>{
      if((manyRecord[manyTableField])&&oneRecord["id"]===manyRecord[manyTableField]["id"]){
        DObject = oneRecord[manyTableField];
        DObject.push(manyRecord)
      }
    })
  })
}


export function AlertObject(props) {
  const onDeployObject = () => {
    alert(JSON.stringify(props.object));
  };

  return (
    <>
      <Button onClick={onDeployObject}>
        <b>{props.children}</b>
      </Button>
    </>
  );
}

