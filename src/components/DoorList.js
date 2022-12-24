import React, { useState, useEffect } from "react";
import api from "../services/ApiService";
import ModalLarge from "../infrastructuur/ModalLarge";
import ModalYesNo from "../infrastructuur/ModalYesNo";
import ReactDOM from "react-dom/client";
import DoorForm from "./DoorForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export default function DoorList(props) {
	 props = { ...props, tableName:"door", headerTitle: "Deuren", editForm: DoorForm };
  const apiString = process.env.REACT_APP_BACKEND_URL + "/door/";
  const editForm = DoorForm;

  // Hieronder alleen de html bij de returncode wijzigen
  const [state, setState] = React.useState({ models: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await api.getAll("door", (response, error) => {
        if (response) {
          setState({ models: response.data });
          console.log(response.data);
          setIsLoaded(true);
        }
        if (error) {
          setIsLoaded(false);
          console.log(error);
        }
      });
    }
    fetchData();
  }, []);

  const onClickNew = (e) => {
    e.preventDefault();
    editRecord(0);
  };

  const onClickEdit = (e) => {
    e.preventDefault();
    editRecord(e.target.value);
  };

  const editRecord = (id) => {
    const root = ReactDOM.createRoot(document.getElementById("ModalLarge"));
    root.render(
      <ModalLarge
        header={props.headerTitle}
        render={() => new editForm({ id: id })}
      />
    );
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    const root = ReactDOM.createRoot(document.getElementById("ModalYesNo"));

    root.render(
      <ModalYesNo
        header={props.headerTitle}
        // render={() => new AreaForm(e.target.value)}
        body="Wilt u dit record echt verwijderen?"
        cancelText="No"
        confirmText="Yes"
        exec={() => {
          api.deleteId("door", e.target.value);
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
            <h1>{props.headerTitle}</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>Deur Id</td>
                  <td>naam</td>
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
                  <tr key={model?.id}>
                    <td>{model?.id}</td>
                    <td>{model?.name}</td>
                    <td>{model?.doortype?.id}</td>
                    <td>{model?.doortype?.name}</td>
                    <td>{model?.from_area?.id}</td>
                    <td>{model?.from_area?.name}</td>
                    <td>{model?.to_area?.id}</td>
                    <td>{model?.to_area?.name}</td>
                    <td style={{width:"20px"}}>
                      <Button size="sm" value={model?.id} onClick={onClickEdit}>
                        Edit
                      </Button>
                    </td>
                    <td style={{width:"20px"}}>
                      <Button
                        size="sm"
                        value={model?.id}
                        onClick={onClickDelete}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        <Button size="sm" onClick={onClickNew}>
          Toevoegen
        </Button>
      </Form>
    </>
  );
}
