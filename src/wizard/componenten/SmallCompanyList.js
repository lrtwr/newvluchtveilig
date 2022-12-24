import React from "react";
import * as t from "../../tools/LeerTools.tsx";
import Table from "react-bootstrap/Table";
import { FormGroup, Button } from "react-bootstrap";
import * as events from "../../infrastructuur/InfraEvents";
import CompanyForm from "../../components/CompanyForm";

export default function SmallCompanyList(props){
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Id</td>
              <td>Bedrijf</td>
            </tr>
          </thead>
          <tbody>
            {props.resCompany?.data?.map((model) => (
              <tr key={model?.id}>
                <td
                  onClick={() => {
                    props.onRowClick(model);
                  }}>
                  {model["id"]}
                </td>
                <td
                  onClick={() => {
                    props.onRowClick(model);
                  }}>
                  {model?.name}
                </td>
                <td style={{ width: "20px" }}>
                  <Button
                  variant="success"
                    size="sm"
                    value={model?.id}
                    onClick={(e) =>
                      events.onClickEdit(e, { editForm: CompanyForm })
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
                        tableName: "company",
                        headerTitle: "Bedrijf",
                      })
                    }>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <FormGroup>
          <Button
          variant="success"
            onClick={(e) =>
              events.onClickNew(e, {
                editForm: CompanyForm,
                headerTitle: "Bedrijf",
              })
            }>
            Nieuw Bedrijf
          </Button>
        </FormGroup>
      </>
    );
  };


