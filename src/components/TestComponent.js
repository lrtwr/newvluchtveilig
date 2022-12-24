import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FormGroup, Button } from "react-bootstrap";
import ReactFlowFloorReport from "../reactflow/ReactFlowFloorReport";
import * as t from "../tools/LeerTools.tsx";
import { useAsyncGetAll } from "../tools/useAsync";
import axios from "axios";
function ControlledTabsExample() {
  let [aaa, setAaa] = useState("AAA");

  let obj = { aaa: 1, bbb: 2, ccc: 3 };
  const a = { b: 1, c: 2, d: { e: [1, 2, 3, 4, 5] } };
  a.d.e.push({...obj,ddd:4});
  a.d.e[a.d.e.length]=obj;
  a.d.e[5].aaa = 3;

  return <>{JSON.stringify(a.d.e[5])}</>;
}

export default ControlledTabsExample;
