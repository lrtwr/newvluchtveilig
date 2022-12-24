import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as t from "../tools/LeerTools.tsx";
import { useAsyncGetById } from "../tools/useAsync";
import * as select from "../infrastructuur/InfraSelect.tsx";
import { onSubmit, onError, onLoading } from "../infrastructuur/InfraEvents";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormStandard, gatherProps } from "../infrastructuur/InfraFormTools";

let yup = require("yup");

const defaultValues = { name: "area", floor:{id:3,name:"text 4"}, areatype_id:1};
const yupSchema = yup.object().shape({
	name: yup.string().required(),
	width: yup.number().positive().required(),
	areaSqm: yup.number().required().positive(),
	// escaperoutetype_id: yup.object().required(),
	// TODO
	// areatype_id
	// escaproutetype_id not null
	// stairareatype_id not null, mag alleen zichtbaar zijn als het een trappenhuis is
	//
	// capacity?: yup.number().required().positive(),
});

export default function AreaForm(props) {
	props = gatherProps(props, "area", defaultValues, yupSchema);
	const form = useFormStandard(props);
	const resFloor = useAsyncGetById("floor",3);
	const result = useAsyncGetById( props.tableName, props.id, (response, error) => {
			if (response){
				form.reset(response.data);
				// form.setValue("floor",resFloor.data);
			}
		},
	);
 useEffect(()=>{
	if(!resFloor.isLoaded) return
	props.defaultValues.floor={};
	props.defaultValues.floor.id=resFloor.data.id;
	props.defaultValues.floor.name=resFloor.data.name;
	// t.a(props.defaultValues);
	if(props.id==0)form.reset(props.defaultValues);
 },[resFloor.isLoaded])

	const ColGroep = (props) => (
		<Col>
			<Form.Group className="mb-3">{props.children}</Form.Group>
		</Col>
	);

	const ColLabelControlGroup = (props) => {
		return (
			<>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>{props.label}</Form.Label>
						<Form.Control
							{...form.register(props.fieldName)}
							placeholder={props.label}
						/>
						<t.FormTextError
							fieldName={props.fieldName}
							errors={props.errors}
							errorMessage={props.errorMessage}>
							{props.message}
						</t.FormTextError>
					</Form.Group>
				</Col>
			</>
		);
	};

	const FormBody = () => (
		<>
			{/* {JSON.stringify(result.data)} */}
			<div className="formBody">
				<Form onSubmit={form.handleSubmit((e) => onSubmit(e, props), onError)}>
					<Form.Control
						readOnly
						{...form.register("id", { valueAsNumber: true })}
						placeholder="id"
						hidden
					/>
					<Container>
						<Row>
							<ColLabelControlGroup
								label="Naam van de ruimte"
								fieldName="name"
								errors={form.errors}
								errorMessage="Area moet ingevuld zijn!"
								message="Area Name description"></ColLabelControlGroup>
						</Row>
						<Row>
							<ColLabelControlGroup
								label="Breedte doorgang"
								fieldName="width"
								errors={form.errors}
								errorMessage="Breedte moet ingevuld zijn!"
								message="Breedte van de doorgang."></ColLabelControlGroup>
							<ColLabelControlGroup
								label="Ruimte Oppervlak"
								fieldName="areaSqm"
								errors={form.errors}
								errorMessage="Oppervlakte moet ingevuld zijn!"
								message="Oppervlakte van de doorgang."></ColLabelControlGroup>
						</Row>
						 <Row>
							<ColLabelControlGroup
								label="Capaciteit"
								fieldName="capacity"
								errors={form.errors}
								errorMessage="Capaciteit moet ingevuld zijn!"
								message="Capaciteit van de doorgang."></ColLabelControlGroup>
							<ColGroep>
								<Form.Label>Type Ruimte</Form.Label>
								<select.SelectAreaType
									{...form.register("areatype_id")}
									model={result.data}
									defaultValues={props.defaultValues}
									// defaultValue={props.defaultValues.areatype_id}
									onChange={(e) => form.setValue("areatype_id", e.value)}
								/>
							</ColGroep>
						</Row>
						<Row>
							<ColGroep>
								<Form.Label>Type Vluchtroute</Form.Label>
								<select.SelectEscapeRouteType
									{...form.register("escaperoutetype_id")}
									model={result.data}
									onChange={(e) => form.setValue("escaperoutetype_id", e.value)}
								/>
							</ColGroep>
	

							<ColGroep>
								<Form.Label>Trappenhuis {}</Form.Label>
								<select.SelectStairAreaType
									{...form.register("stairareatype_id")}
									model={result.data}
									onChange={(e) => form.setValue("stairareatype_id", e.value)}
								/>
							</ColGroep>
						</Row> 
						<Row>
						<ColGroep>
								<Form.Label>Verdieping {}</Form.Label>
								<select.SelectFloor
									{...form.register("floor")}
									model={result.data}
									defaultValue={props.defaultValues.floor}
									onChange={(e) => form.setValue("floor", {id:e.value})}
								/>
							</ColGroep>
						</Row>
						<Button type="submit" variant="success">
							Save
						</Button>
					</Container>
				</Form>
			</div>
		</>
	);

	if (result.error) return onError(result.error);
	return result.isLoaded ? FormBody() : onLoading;
}
