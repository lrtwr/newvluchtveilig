import { useForm } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";
import ApiService from "./OldApiService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function StairTypeForm(props) {
	const id = typeof props == "object" ? props.id : props;
	const defaultValues = {
		name: "",
		height: "",
		width: "",
		numOfStairs: "",
		wdithOfStairs: "",
	};

	const apiString = process.env.REACT_APP_BACKEND_URL + "/stairtypes/";

	// Select (alle drie)
	const [isLoaded, setIsLoaded] = useState(false);

	const api = new ApiService(apiString);
	const { register, handleSubmit, reset } = useForm({
		defaultValues,
	});

	const resetAsyncForm = useCallback(async () => {
		//Eerst Select boxen verzamelen

		//Is er een id? bij nee betekent dit new
		if (id != "0" && id != "") {
			//formdata laden
			const result = await api.getById(id);
			console.log("form data");
			console.log(result.data);
			reset(result.data);

			//Select foreign key for select box
		}

		//Form is ready to render
		setIsLoaded(true);
	}, [reset]);

	useEffect(() => {
		const fetchData = async () => await resetAsyncForm();
		fetchData();
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
				{!isLoaded && <p>loading...</p>}
				{isLoaded && (
					<>
						<Form.Group className="mb-3">
							<Form.Label>Id</Form.Label>
							<Form.Control
								readOnly
								{...register("id", { valueAsNumber: true })}
								placeholder="id"
								hidden
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control {...register("name", require)} placeholder="name" />
							<Form.Text className="text-muted">Area name</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Height</Form.Label>
							<Form.Control
								{...register("height", { require, valueAsNumber: true })}
								placeholder="Height"
							/>
							<Form.Text className="text-muted">Width of the area</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Width</Form.Label>
							<Form.Control
								{...register("width", { require, valueAsNumber: true })}
								placeholder="Width"
							/>
							<Form.Text className="text-muted">Width of the area</Form.Text>
						</Form.Group>


						<Form.Group className="mb-3">
							<Form.Label>Capacity</Form.Label>
							<Form.Control
								{...register("capacity", { require, valueAsNumber: true })}
								placeholder="capacity"
							/>
							<Form.Text className="text-muted">Capacity of the area</Form.Text>
						</Form.Group>

						<Form.Group>
							<Button type="submit">Save</Button>
						</Form.Group>
					</>
				)}
			</Form>
		</>
	);
}
