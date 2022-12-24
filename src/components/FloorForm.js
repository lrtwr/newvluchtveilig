import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import t, { FormTextError } from "../tools/LeerTools.tsx";
import { useAsyncGetAll } from "../tools/useAsync";
import * as select from "../infrastructuur/InfraSelect.tsx";
import { onSubmit, onError, onLoading } from "../infrastructuur/InfraEvents";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormStandard, gatherProps } from "../infrastructuur/InfraFormTools";

let yup = require("yup");

const defaultValues = { name: "floor" };
const yupSchema = yup.object().shape({
	name: yup.string().required(),
	// width: yup.number().positive().required(),
	// areaSqm: yup.number().required().positive(),
	// capacity: yup.number().required().positive(),
});

export default function AreaForm(props) {
	props = gatherProps(props, "floor", defaultValues, yupSchema);

	const form = useFormStandard(props);

	const result = useAsyncGetAll(props.tableName,props.id,
		(response, error) => form.reset(response.data));

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
							type={props.type}
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
					<Form.Control
						readOnly
						{...form.register("id", { valueAsNumber: true })}
						placeholder="id"
						hidden
					/>
					<Container>
						<Row>
							<ColLabelControlGroup
								label="Name"
								fieldName="name"
								errors={form.errors}
								errorMessage="Area moet ingevuld zijn!"
								message="Area Name description"></ColLabelControlGroup>
						</Row>
						<Row>
							<ColLabelControlGroup
								label="Etage nummer"
								fieldName="floornumber"
								errors={form.errors}
								type="number"
								errorMessage="Verdiepingsnummer moet ingevuld zijn!"
								message="Verdiepings niveau zoals het in de lift gebruikt wordt."></ColLabelControlGroup>
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

// const magweg= (
//   <>
//     <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
//       {!isLoaded && <p>loading...</p>}
//       {isLoaded && (
//         <>
//           <Form.Group className="mb-3">
//             <Form.Label>Id</Form.Label>
//             <Form.Control readOnly
//               {...register("id", { valueAsNumber: true })}
//               placeholder="id"
//               hidden
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control {...register("name", require)} placeholder="name" />
//             <Form.Text className="text-muted">Building</Form.Text>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Etage nummer</Form.Label>
//             <Form.Control {...register("floornumber", require)} placeholder="Etage nummer" />
//             <Form.Text className="text-muted">Building</Form.Text>
//           </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Building</Form.Label>

//               <Select
//                 {...register("building", {require})}
//                 id="trueTypeSelect"
//                 className="input-cont"
//                 placeholder="Select a Building"
//                 options={selectOptions.options}
//                 defaultValue={selectOptions.options.filter(function (option) {
//                   return option.value === defaultId;
//                 })}
//                 onChange={handleSelectChange}
//               ></Select>

//           </Form.Group>
//           <Button type="submit">Save</Button>
//         </>
//       )}
//     </Form>
//   </>
// );
