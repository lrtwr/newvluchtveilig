import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import AreaList from "./components/AreaList";
import AreaForm from "./components/AreaForm";

import DoorList from "./components/DoorList";
import DoorForm from "./components/DoorForm";

import StairList from "./components/StairList";
import StairForm from "./components/StairForm";

import CompanyList from "./components/CompanyList";
import CompanyForm from "./components/CompanyForm";

import BuildingList from "./components/BuildingList";
import BuildingForm from "./components/BuildingForm";

import FloorList from "./components/FloorList";
import FloorForm from "./components/FloorForm";

import DoorListForm from "./reactflow/components/DoorListForm";

import Menu from "./infrastructuur/Menu";
import Wizard from "./wizard/Wizard.tsx";
import ReactFlowFloor from "./reactflow/ReactFlowFloor.js";
import WhoAmi from "./components/WhoAmI";
import ReactFlowTest from "./old/ReactFlowTest";
import Welcome from "./components/Welcome";
import FillDB from "./tools/FillDB";
import TestComponent from "./components/TestComponent";

export default function App() {
  const PageDoesNotExist = () => {
    return <h1>No Page Found!</h1>;
  };

  const ClearSessionMemory = () => {
    sessionStorage.clear();
    return <h1>Memory cleared!</h1>;
  };

  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"></script>
      <script>var Alert = ReactBootstrap.Alert;ReactBootstrap.Alert();</script>

      <BrowserRouter>
        {/* <ModalLarge show='true' body='<h1>Modal Tekst</h1>'></ModalLarge> */}
        <div id="header">
          <Menu />
        </div>
        <div id="content">
          <Routes>
            <Route path="/" element={<Wizard />}></Route>
            <Route path="/areas" element={<AreaList />}></Route>
            <Route
              path="/areas/:id"
              element={<AreaForm id={useParams()} />}></Route>

            <Route path="/doors" element={<DoorList />}></Route>
            <Route
              path="/doors/:id"
              element={<DoorForm id={useParams()} />}></Route>

            <Route path="/doorlistform" element={<DoorListForm />}></Route>

            <Route path="/doors" element={<DoorList />}></Route>
            <Route
              path="/doors/:id"
              element={<DoorForm id={useParams()} />}></Route>

            <Route path="/stairs" element={<StairList />}></Route>
            <Route
              path="/stairs/:id"
              element={<StairForm id={useParams()} />}></Route>

            <Route path="/companies" element={<CompanyList />}></Route>
            <Route
              path="/companies/:id"
              element={<CompanyForm id={useParams()} />}></Route>

            <Route path="/companies" element={<CompanyList />}></Route>
            <Route
              path="/companies/:id"
              element={<CompanyForm id={useParams()} />}></Route>

            <Route path="/buildings" element={<BuildingList />}></Route>
            <Route
              path="/buildings/:id"
              element={<BuildingForm id={useParams()} />}></Route>

            <Route path="/floors" element={<FloorList />}></Route>
            <Route
              path="/floors/:id"
              element={<FloorForm id={useParams()} />}></Route>

            <Route path="/reactflowtest" element={<ReactFlowTest />}></Route>
            <Route path="/reactflowppp" element={<ReactFlowFloor />}></Route>
            <Route path="/wizard" element={<Wizard />}></Route>
            <Route path="/flow" element={<ReactFlowTest />}></Route>
            <Route path="/whoami" element={<WhoAmi />}></Route>
            <Route path="/welcome" element={<Welcome />}></Route>
            <Route path="/filldb" element={<FillDB />}></Route>
            <Route
              path="/clearsessionmemory"
              element={<ClearSessionMemory />}></Route>
            <Route path="/testcomponent" element={<TestComponent />}></Route>
            <Route path="*" element={<PageDoesNotExist />}></Route>
          </Routes>
          <div id="ModalLarge" />
          <div id="ModalYesNo" />
          <div id="ModalMessage" />
        </div>
      </BrowserRouter>
    </>
  );
}
