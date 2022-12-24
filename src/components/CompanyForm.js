import React from "react";
import {Form,Button} from "react-bootstrap";
import * as t from "../tools/LeerTools.tsx";
import { useAsyncGetById } from "../tools/useAsync";
import { onSubmit, onError, onLoading } from "../infrastructuur/InfraEvents";
import {Row, Col, Container} from "react-bootstrap";
import { useFormStandard, gatherProps } from "../infrastructuur/InfraFormTools";

let yup = require("yup");

const defaultValues = { name: "company" };
const yupSchema = yup.object().shape({
	name: yup.string().required(),
	// width: yup.number().positive().required(),
	// areaSqm: yup.number().required().positive(),
	// capacity: yup.number().required().positive(),
});

export default function CompanyForm(props) {
	props = gatherProps(props, "company", defaultValues, yupSchema);
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
								label="Bedrijf"
								fieldName="name"
								errors={form.errors}
								errorMessage="Area moet ingevuld zijn!"
								message="Naam van het bedrijf"></ColLabelControlGroup>
						</Row>
						<Row>
							<ColLabelControlGroup
								label="Beschrijving"
								fieldName="description"
								errors={form.errors}
								errorMessage=""
								message="Korte beschrijving (optioneel)"></ColLabelControlGroup>
						</Row>
						<Button type="submit">Save</Button>
					</Container>
				</Form>
			</div>
		</>
	)

	if (result.error) return onError(result.error);
	return result.isLoaded ? FormBody() : onLoading;
}
