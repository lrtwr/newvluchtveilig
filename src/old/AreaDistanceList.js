import React, { useState, useEffect } from "react";
import ApiService from "./OldApiService";
import ModalLarge from "../infrastructuur/ModalLarge";
import ModalYesNo from "../infrastructuur/ModalYesNo";
import ReactDOM from "react-dom/client";
import AreaDistanceForm from "./AreaDistanceForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export default function AreaDistanceList() {
const apiString = process.env.REACT_APP_BACKEND_URL + "/areadistance/";
const editForm = AreaDistanceForm;
const headerTitle = "Deuren";

// Hieronder alleen de html bij de returncode wijzigen
  const api=new ApiService(apiString)
  const [state, setState] = React.useState({ models: [] });
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
   async function fetchData() {
   await api.get()
      .then((response) => {
        setState({ models: response.data });
        console.log(response.data);
        setIsLoaded(true);
      })
      .catch(function (error) {
        setIsLoaded(false);
        console.log(error);
      });
    }
      fetchData();
  },[]);


const onClickNew = (e) => {
  e.preventDefault();
  editRecord(0);
}

  const onClickEdit = (e) => {
    e.preventDefault();
    editRecord(e.target.value);
  }

  const editRecord=(id)=>{

    const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));
    root.render(
      <ModalLarge
        header={headerTitle}
        render={() => new editForm({id:id})}
      />
    );
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    const root = ReactDOM.createRoot(document.getElementById("ModalYesNo"));

    root.render(
      <ModalYesNo
        header={headerTitle}
        // render={() => new AreaForm(e.target.value)}
        body="Wilt u dit record echt verwijderen?"
        cancelText="No"
        confirmText="Yes"
        exec={() => {
          api.deleteId(e.target.value);
          window.location.reload(false);
        }}
      />
    );
  };

  return (
    <>
      <Form>
        {!isLoaded && <p>loading...</p>}
        {isLoaded && (
          <>
            <h1>{headerTitle}</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>Deur Id</td>
                  <td>naam</td>
                  <td>richting</td>
                  <td>deurtype ID</td>
                  <td>deurtype naam</td>
                  <td>from area</td>
                  <td>Van Area</td>
                  <td>Naar area ID</td>
                  <td>Naar Area</td>
                </tr>
              </thead>
              <tbody>
                {state.models.map((model) => (
                  <tr key={model.id}>
                    <td>{model.id}</td>
                    <td>{model.name}</td>
                    <td>{model.direction}</td>
                    <td>{model.from_area.id}</td>
                    <td>{model.from_area.name}</td>
                    <td>{model.to_area.id}</td>
                    <td>{model.to_area.name}</td>
                    {/* {model.areatype!=null&&<td>{model.areatype.name}</td>} */}
                    {/* {model.areatype==null&&<td>Niet geselecteerd.</td>} */}
                    <td>
                      <Button size="sm" value={model.id} onClick={onClickEdit}>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button size="sm" value={model.id} onClick={onClickDelete}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        <Button size="sm" onClick={onClickNew}>Toevoegen</Button>
      </Form>
    </>
  );
}
