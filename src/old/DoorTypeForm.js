import { useForm } from "react-hook-form";
import React, { useCallback, useEffect,  } from "react";
import ApiService from "./OldApiService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function DoorTypeForm(props) {
	const id=(typeof props=="object")?props.id:props;
	const defaultValues = { name: "", width: "", doubleDoor: "", angle: "" };
	const apiString = process.env.REACT_APP_BACKEND_URL + "/doortype/";

	// Hieronder alleen de html code bij return veranderen
	const api = new ApiService(apiString);
	const { register, handleSubmit, reset } = useForm({ defaultValues });
	const resetAsyncForm = useCallback(async () => {
		const result = await api.getById(id);
		console.log(result.data);
		reset(result.data);
	}, [reset]);

	useEffect(() => {
		if (id !== "0" && id !== "") {
			resetAsyncForm();
		}
	}, []);

	const onSubmit = (data) => {
		console.log(data);
		api.post(data);

		document.querySelectorAll(".modal").forEach((el) => {
			el.style.visibility = "hidden";
			el.classList.remove("modal-backdrop");
		});

		document.getElementById("ModalLargeId").classList.remove("show", "d-block");
		document
			.querySelectorAll(".modal-backdrop")
			.forEach((el) => el.classList.remove("modal-backdrop"));
		window.location.reload(false);
	};

	return (
		<>
			<Form onSubmit={handleSubmit((data) => onSubmit(data))}>
				<Form.Group className="mb-3">
					<Form.Label>Id</Form.Label>
					<Form.Control
						{...register("id", { valueAsNumber: true })}
						placeholder="id"
						disabled
					/>
					<Form.Text className="text-muted">
						Just for developpers to know.
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control {...register("name")} placeholder="name" />
					<Form.Text className="text-muted">Area name</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Width</Form.Label>
					<Form.Control
						{...register("width", { valueAsNumber: true })}
						placeholder="123"
					/>
					<Form.Text className="text-muted">Width of the area</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Dubbele deur</Form.Label>
					<Form.Control
						{...register("doubleDoor", { valueAsNumber: true })}
						placeholder="1 of 0"
					/>
					<Form.Text className="text-muted">AreaSqm of the area</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Deur draaihoek</Form.Label>
					<Form.Control
						{...register("angle", { valueAsNumber: true })}
						placeholder="90"
					/>
					<Form.Text className="text-muted">Capacity of the area</Form.Text>
				</Form.Group>
				<Button type="submit">Save</Button>
			</Form>
		</>
	);
}
