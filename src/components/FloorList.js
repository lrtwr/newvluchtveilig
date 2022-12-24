import React, { useState, useEffect } from "react";
import FloorForm from "./FloorForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import t from "../tools/LeerTools.tsx";
import * as events from "../infrastructuur/InfraEvents"
import { useAsyncGetAll } from "../tools/useAsync";

export default function FloorList() {
  const result = useAsyncGetAll("floor" );
  const props = { tableName:"floor", headerTitle: "Verdiepingen", editForm: FloorForm };

  if (result.error)events.onError(result.error);
  if (!result.isLoaded) return events.onLoading();

  const headerTDs = (<>
<td>Floor Id</td>
<td>Floor Name</td>
<td>Floor Number</td>
<td>Building</td>
<td>Building Id</td>
  </>)

  const bodyTDs =(model)=>(<>
<td>{model.id}</td>
<td>{model.name}</td>
<td>{model.floornumber}</td>
{model.building!=null&&<td>{model.building.name}</td>}
{model.building==null&&<td>Niet geselecteerd.</td>}
{model.building!=null&&<td>{model.building.id}</td>}
{model.building==null&&<td>Niet geselecteerd.</td>}
  </>)

  return (
    <>
      <Form>
        <h1>{props.headerTitle}</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
            {headerTDs}
            </tr>
          </thead>
          <tbody>
            {result.data.map((model) => (
              <tr key={model.id}>
                {bodyTDs(model)}
                <td style={{width:"20px"}}>
                  <Button
                    size="sm"
                    value={model.id}
                    onClick={(e) => events.onClickEdit(e, props)}>
                    Edit
                  </Button>
                </td>
                <td style={{width:"20px"}}>
                  <Button size="sm" value={model.id} onClick={(e)=>events.onClickDelete(e,{...props,id:model.id})}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button size="sm" onClick={(e) => events.onClickNew(e, props)}>
          New Area
        </Button>
      </Form>
    </>
  );
}






