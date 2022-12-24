import React, { useState } from "react";
import * as t from "../../tools/LeerTools.tsx";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import { FormGroup, Button } from "react-bootstrap";
import * as events from "../../infrastructuur/InfraEvents";
import DoorForm from "./SmallDoorForm";
import { useAsyncGetAll } from "../../tools/useAsync";
import { gatherProps } from "../../infrastructuur/InfraFormTools";
import { deleteModalLarge } from "../../infrastructuur/ModalLarge";
import ModalYesNo from "../../infrastructuur/ModalYesNo";
import api from "../../services/ApiService";
import ReactDOM from "react-dom/client";
const defaultValues = {};

export default function DoorListForm(props) {
  const [editId, setEditId] = useState(-1);
  props = gatherProps(props, "door", defaultValues, {});
  const from_id = props?.defaultValues?.from_area
    ? props.defaultValues.from_area.id
    : 0;
  const to_id = props?.defaultValues?.to_area
    ? props.defaultValues.to_area.id
    : 0;


  const onSetEditId = (props, model) => {
    setEditId(-1);
    resDoor.execute(refreshDoors);
  };

  const refreshDoors = (response, error) => {
    if (response) {
      if (from_id && to_id) {
        const filtData = [];
        const resp = { ...response };
        resp.data.forEach((door) => {
          if (door?.from_area?.id == from_id && door?.to_area?.id == to_id)
            filtData.push(door);
          if (door?.from_area?.id == to_id && door?.to_area?.id == from_id)
            filtData.push(door);
        });
        resp.data = filtData;
        response.data = filtData;
        response = resp;
      }
    }
    if (error) {
      events.onError({
        error: error,
        source: "DoorListForm",
        tableName: "door",
      });
    }
  };

  const resDoor = useAsyncGetAll("door", refreshDoors, true);

  const onClickDelete = (e, props) => {
    e.preventDefault();
    const root = ReactDOM.createRoot(document.getElementById("ModalYesNo"));
    root.render(
      <ModalYesNo
        header={props.headerTitle}
        body="Wilt u dit record echt verwijderen?"
        cancelText="No"
        confirmText="Yes"
        exec={() => {
          api.deleteById(props.tableName, e.target.value, (response, error) => {
            if (response) {
              resDoor.execute(refreshDoors);
            }
            if (error)
              console.log(
                "Het gaat fout:" + JSON.stringify(error.response.data)
              );
          });
        }}
      />
    );
  };

  const leaveForm = (e) => {
    deleteModalLarge();
    if (props.render) {
      props.render(props.renderProperties, {
        data: resDoor.data,
        from_id: from_id,
        to_id: to_id,
      });
    }
    window.location.reload(false);
  };

  const DoorList = () => (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Id</td>
            <td>Deurnaam</td>
          </tr>
        </thead>
        <tbody>
          {resDoor?.data?.map((model) => (
            <tr key={model?.id}>
              <td
                onClick={() => {
                  setEditId(model.id);
                }}>
                {model["id"]}
              </td>
              <td
                onClick={() => {
                  setEditId(model.id);
                }}>
                {model?.name}
              </td>
              <td style={{ width: "20px" }}>
                <Button
                  variant="success"
                  size="sm"
                  value={model?.id}
                  onClick={(e) => setEditId(model.id)}>
                  Edit
                </Button>
              </td>
              <td style={{ width: "20px" }}>
                <Button
                  variant="success"
                  size="sm"
                  value={model.id}
                  onClick={(e) =>
                    onClickDelete(e, {
                      headerTitle: "Deze deur verwijderen?",
                      tableName: "door",
                    })
                  }>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Table>
        <Row>
          <td>
              <Button variant="success" onClick={(e) => setEditId(0)}>
                Nieuwe Deur
              </Button>
          </td>
          <td>
              <Button variant="success" onClick={(e) => leaveForm(e)}>
                Klaar
              </Button>
          </td>
        </Row>
      </Table>
    </>
  );

  if (!resDoor.isLoaded) {
    return events.onLoading();
  }
  return (
    <>
      {editId === -1 && (
          <DoorList></DoorList>
      )}
      {editId >= 0 && (
        <>
          <DoorForm
            id={editId}
            render={onSetEditId}
            defaultValues={props.defaultValues}
            renderProperties={{}}></DoorForm>
        </>
      )}
    </>
  );
}
