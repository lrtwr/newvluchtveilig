import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import t, { FormTextError } from "../tools/LeerTools.tsx";
import { useAsyncGetById } from "../tools/useAsync";
import * as select from "../infrastructuur/InfraSelect.tsx";
import { onSubmit, onError, onLoading } from "../infrastructuur/InfraEvents";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormStandard, gatherProps } from "../infrastructuur/InfraFormTools";

let yup = require("yup");

const defaultValues = { name: "" };
const yupSchema = yup.object().shape({
	name: yup.string().required(),
	// width: yup.number().positive().required(),
	// areaSqm: yup.number().required().positive(),
	// capacity: yup.number().required().positive(),
});

export default function BuildingForm(props) {
	props = gatherProps(props, "building", defaultValues, yupSchema);
	const form = useFormStandard(props);
	const result = useAsyncGetById(props.tableName,
		props.id,
		(response, error) => form.reset(response.data),
	);

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
						<FormTextError
							fieldName={props.fieldName}
							errors={props.errors}
							errorMessage={props.errorMessage}>
							{props.message}
						</FormTextError>
					</Form.Group>
				</Col>
			</>
		);
	};

	const FormBody = () => (
		<>
			<div className="formBody">
				<Form onSubmit={form.handleSubmit((e) => onSubmit(e, props), onError)}>
					<Container>
						<Row>
							<ColLabelControlGroup
								label="Gebouw naam"
								fieldName="name"
								errors={form.errors}
								errorMessage="Naam moet ingevuld zijn!"
								message=""></ColLabelControlGroup>
						</Row>
						<Row>
							<ColLabelControlGroup
								label="Beschrijving"
								fieldName="description"
								errors={form.errors}
								errorMessage=""
								message=""></ColLabelControlGroup>
						</Row>
						<Row>
							<ColLabelControlGroup
								label="Adres"
								fieldName="address"
								errors={form.errors}
								errorMessage=""
								message=""></ColLabelControlGroup>
						</Row>
						<Row>
							<ColLabelControlGroup
								label="Postcode"
								fieldName="postcode"
								errors={form.errors}
								errorMessage=""
								message=""></ColLabelControlGroup>
						</Row>
						<Row>
							<ColLabelControlGroup
								label="Stad"
								fieldName="city"
								errors={form.errors}
								errorMessage=""
								message=""></ColLabelControlGroup>
						</Row>

						<Button type="submit">Save</Button>
					</Container>
				</Form>
			</div>
		</>
	);

	if (result.error) return onError(result.error);
	return result.isLoaded ? FormBody() : onLoading;
}
