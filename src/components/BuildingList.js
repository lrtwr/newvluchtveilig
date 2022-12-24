import React, { useState, useEffect } from "react";
import BuildingForm from "./BuildingForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import t from "../tools/LeerTools.tsx";
import * as events from "../infrastructuur/InfraEvents";
import { useAsyncGetAll } from "../tools/useAsync";

export default function AreaList() {
	const result = useAsyncGetAll("building");
	const props = {  tableName:"building", headerTitle: "Gebouw", editForm: BuildingForm };
	if (result.error) events.onError(result.error);
	if (!result.isLoaded) return events.onLoading();

	const headerTDs = (
		<>
			<td>Id</td>
			<td>Gebouw </td>
			<td>Adres</td>
			<td>Postcode</td>
			<td>Stad</td>
		</>
	);

	const bodyTDs = (model) => (
		<>
			<td>{model.id}</td>
			<td>{model.name}</td>
			<td>{model?.address}</td>
			<td>{model.postcode}</td>
			<td>{model.city}</td>
		</>
	);

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
										value={model.id}
										onClick={(e) => events.onClickEdit(e, props)}>
										Edit
									</Button>
								</td>
								<td style={{ width: "20px" }}>
									<Button
										size="sm"
										value={model.id}
										onClick={(e) => events.onClickDelete(e, props)}>
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
