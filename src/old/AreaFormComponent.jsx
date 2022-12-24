import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
// import ApiService from './ApiService';

export default function AreaFormComponent() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
		console.log(errors);
		post(data);
		// axios.post(data);
		// ApiService.Post()
	};

	const post = (data) => {
		let name = data.name;
		let capacity = data.capacity;
		let areaSqm = data.areaSqm;
		let width = data.width;
		let areatype = data.areatype;
		axios
			.post(process.env.REACT_APP_BACKEND_URL + "/areas", {
				name,
				capacity,
				areaSqm,
				width,
				areatype: { id: areatype },
			})
			.then(
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log(error);
				}
			);
	};

	return (
		<div class="w-full max-w-xs">
			<div class="md:flex md:items-center mb-6">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div class="md:w-1/3">
						<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
							Name
						</label>
						<input
							class="border py-2 px-3 text-grey-800"
							type="text"
							placeholder="Name"
							{...register("name", {})}
						/>
					</div>
					<input
						class="border py-2 px-3 text-grey-800"
						type="text"
						placeholder="Capacity"
						{...register("capacity", {})}
					/>
					<input
						class="border py-2 px-3 text-grey-800"
						type="text"
						placeholder="Width"
						{...register("width", {})}
					/>
					<input
						class="border py-2 px-3 text-grey-800"
						type="text"
						placeholder="AreaSqm"
						{...register("areaSqm", {})}
					/>
					<input
						class="border py-2 px-3 text-grey-800"
						type="text"
						placeholder="AreaType"
						{...register("areatype", {})}
					/>
					{/* <input class="border py-2 px-3 text-grey-800"  type="text" placeholder="FromRoom" {...register} />
        <input class="border py-2 px-3 text-grey-800"  type="text" placeholder="ToRoom" {...register} /> */}

					<input
						class="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded"
						type="submit"
					/>
				</form>
			</div>
		</div>
	);
}
