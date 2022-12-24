import React from "react";
import CompanyForm from "./CompanyForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import * as t from "../tools/LeerTools.tsx";
import * as events from "../infrastructuur/InfraEvents";
import { useAsyncGetAll } from "../tools/useAsync";
import 'bootstrap/dist/css/bootstrap.min.css';

const defaultValues = {};
const yupSchema = {};

export default function AreaList() {
	const result = useAsyncGetAll("company", (response) =>{});
	const props = {  tableName:"company", headerTitle: "Bedrijven", editForm: CompanyForm };

	if (result.error) events.onError(result.error);
	if (!result.isLoaded) return events.onLoading();

  const headerTDs = (
    <>
      <td>Bedrijfsid</td>
      <td>Bedrijfsnaam</td>
    </>
  );

  const bodyTDs =(model)=>(<>
                  <td>{model.id}</td>
                <td>{model.name}</td>

  </>)

	return (
		<>
			<Form>
				<h1>{props.headerTitle}</h1>
				<Table striped bordered hover>
					<thead>
						<tr>{headerTDs}</tr>
					</thead>
					<tbody>
						{result.data.map((model) => (
							<tr key={model.id}>
								{bodyTDs(model)}
								<td style={{ width: "20px" }}>
									<Button
										size="sm"
										variant="success"
										value={model.id}
										onClick={(e) => events.onClickEdit(e, props)}>
										Edit
									</Button>
								</td>
								<td style={{ width: "20px" }}>
									<Button
										size="sm"
										variant="success"
										value={model.id}
										onClick={(e) => events.onClickDelete(e, {...props,id:model.id})}>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Button size="sm" variant="success" onClick={(e) => events.onClickNew(e, props)}>
					New Area
				</Button>
			</Form>
		</>
	);
}
