import React, { useState, useEffect } from "react";
import StairsForm from "./StairForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import t from "../tools/LeerTools.tsx";
import * as events from "../infrastructuur/InfraEvents";
import { useAsyncGetAll } from "../tools/useAsync";

export default function StairList() {
	const result = useAsyncGetAll("stair");
	const props = { tableName:"stair", headerTitle: "Trappen", editForm: StairsForm };

	if (result.error) events.onError(result.error);
	if (!result.isLoaded) return events.onLoading();

	const headerTDs = (
		<>
			<td>Trap Id</td>
			<td>Trap Naam</td>
			<td>Bovenruimte trap</td>
			<td>Onderruimte trap</td>
			<td>Traphoogte</td>
			<td>Doorstroomcapaciteit</td>
		</>
	);

  const bodyTDs =(model)=>(<>
                  <td>{model.id}</td>
                <td>{model.name}</td>
                <td>{model?.upper_stair_area?.name}&nbsp;{model?.upper_stair_area?.id}</td>
				<td>{model?.lower_stair_area?.name}&nbsp;{model?.lower_stair_area?.id}</td>
                <td>{model?.stairsheighttype?.name}&nbsp;{model?.stairsheighttype?.id}</td>
                <td>{model?.stairscapacitytype?.name}&nbsp;{model?.stairscapacitytype?.id}</td>
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
										value={model.id}
										onClick={(e) => events.onClickEdit(e, props)}>
										Edit
									</Button>
								</td>
								<td style={{ width: "20px" }}>
									<Button
										size="sm"
										value={model.id}
										onClick={(e) => events.onClickDelete(e, {...props,id:model.id})}>
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
