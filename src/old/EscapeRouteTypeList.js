import React, { useState } from "react";
import ApiService from "./OldApiService";
import ModalLarge from "../infrastructuur/ModalLarge";
import ModalYesNo from "../infrastructuur/ModalYesNo";
import ReactDOM from "react-dom/client";
import EscapeRouteTypeForm from "./EscapeRouteTypeForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EscapeRouteTypeList() {
const apiString = process.env.REACT_APP_BACKEND_URL + "/escaperoutetype/";
const editForm = EscapeRouteTypeForm;
const headerTitle = "EscapeRouteType";

// Hieronder alleen de html bij de returncode wijzigen
  const api=new ApiService(apiString)
  const [state, setState] = React.useState({ models: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  React.useEffect(() => {
    api.get()
      .then((response) => {
        setState({ models: response.data });
        console.log(state.models);
        setIsLoaded(true);
      })
      .catch(function (error) {
        setIsLoaded(false);
        console.log(error);
      });
  }, []);

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
            <table className="table table striped">
              <thead>
                <tr>
                  <td>EscapeRouteType Id</td>
                  <td>EscapeRouteType Name</td>
                </tr>
              </thead>
              <tbody>
                {state.models.map((model) => (
                  <tr key={model.id}>
                    <td>{model.id}</td>
                    <td>{model.name}</td>
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
            </table>
          </>
        )}
        <Button size="sm" onClick={onClickNew}>New {headerTitle}</Button>
      </Form>
    </>
  );
}
