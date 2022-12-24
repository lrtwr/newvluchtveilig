import React from "react";
import * as t from "../../tools/LeerTools.tsx";
import Table from "react-bootstrap/Table";
import * as events from "../../infrastructuur/InfraEvents";
import FloorForm from "../../components/FloorForm";
import { Button } from "react-bootstrap";

export default function SmallFloorList(props){
    const selectedBuilding = t.getSesMemObj("SelectedBuilding");
    const data = props.resFloor.data.filter((floor) => {
      return floor?.building?.id == selectedBuilding.id;
    });
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Id</td>
              <td>Verdieping</td>
              <td>Verdieping nummer</td>
            </tr>
          </thead>
          <tbody>
            {data.map((model) => (
              <tr key={model?.id}>
                <td
                  onClick={() => {
                    props.onRowClick(model);
                  }}>
                  {model.id}
                </td>
                <td
                  onClick={() => {
                    props.onRowClick(model);
                  }}>
                  {model.name}
                </td>
                <td
                  onClick={() => {
                    props.onRowClick(model);
                  }}>
                  {model.floornumber}
                </td>
                <td style={{ width: "20px" }}>
                  <Button
                  variant="success"
                    size="sm"
                    value={model?.id}
                    onClick={(e) =>
                      events.onClickEdit(e, {
                        editForm: FloorForm,
                        defaultValues: {
                          building: { id: selectedBuilding?.id },
                        },
                      })
                    }>
                    Edit
                  </Button>
                </td>
                <td style={{ width: "20px" }}>
                  <Button
                  variant="success"
                    size="sm"
                    value={model.id}
                    onClick={(e) =>
                      events.onClickDelete(e, {
                        tableName: "floor",
                        headerTitle: "Verdieping",
                      })
                    }>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
        variant="success"
          onClick={(e) =>
            events.onClickNew(e, {
              editForm: FloorForm,
              defaultValues: { building: { id: selectedBuilding?.id } },
              headerTitle: "Verdieping",
            })
          }>
          Nieuw Verdieping
        </Button>
      </>
    );
  };