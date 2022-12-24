import React from "react";
import * as t from "../../tools/LeerTools.tsx";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import * as events from "../../infrastructuur/InfraEvents";
import BuildingForm from "../../components/BuildingForm";

export default function SmallBuildingList(props){
    const selectedCompany = t.getSesMemObj("SelectedCompany");
    const data = props.resBuilding.data.filter((building) => {
      return building?.company?.id == selectedCompany.id;
    });
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Id</td>
              <td>Gebouw</td>
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
                <td style={{ width: "20px" }}>
                  <Button
                  variant="success"
                    size="sm"
                    value={model?.id}
                    onClick={(e) =>
                      events.onClickEdit(e, {
                        editForm: BuildingForm,
                        defaultValues: { company: { id: selectedCompany?.id } },
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
                        tableName: "building",
                        headerTitle: "Gebouw",
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
              editForm: BuildingForm,
              defaultValues: { company: { id: selectedCompany?.id } },
              headerTitle: "Gebouw",
            })
          }>
          Nieuw Gebouw
        </Button>
      </>
    );
  };