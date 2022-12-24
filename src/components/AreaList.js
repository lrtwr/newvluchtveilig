import React from "react";
import AreaForm from "./AreaForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import * as t from "../tools/LeerTools.tsx";
import * as events from "../infrastructuur/InfraEvents";
import { useAsyncGetAll } from "../tools/useAsync";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AreaList() {
	const result = useAsyncGetAll("area", (response) =>{});
	const props = { tableName:"area", headerTitle: "Area", editForm: AreaForm };

	if (result.error) events.onError(result.error);
	if (!result.isLoaded) return events.onLoading();

	const headerTDs = (
		<>
			<td>Ruimte Id</td>
			<td>Ruimte Naam</td>
			<td>Verdieping</td>
			<td>Ruimte Type</td>
			<td>Vlucht Route Type</td>
			<td>Trappenhuis Type</td>
		</>
	);

  const bodyTDs =(model)=>(<>
                  <td>{model.id}</td>
                <td>{model.name}</td>
                <td>{model?.floor?.name}</td>
				<td>{model?.areatype?.name}</td>
                <td>{model?.escaperoutetype?.name}</td>
                <td>{model?.stairareatype?.name}</td>
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
