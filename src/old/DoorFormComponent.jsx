// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";

// export default function DoorFormComponent() {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm();
// 	const onSubmit = (data) => {
// 		console.log(data);
// 		console.log(errors);
// 		post(data);
// 	};

// 	const post = (data) => {
// 		let name = data.name;
// 		let direction = data.direction;
// 		let doortype = data.doortype;
// 		let from_area = data.from_area;
// 		let to_area = data.to_area;
// 		axios
// 			.post(process.env.REACT_APP_BACKEND_URL + "/doors", {
// 				name,
// 				direction,
// 				doortype: { id: doortype },
// 				from_area: { id: from_area },
// 				to_area: { id: to_area },
// 			})
// 			.then(
// 				(response) => {
// 					console.log(response);
// 				},
// 				(error) => {
// 					console.log(error);
// 				}
// 			);
// 	};
// 	return (
// 		<div class="flex justify-center items-center h-screen w-full bg-blue-400">
// 			<div class="flex justify-center items-center h-screen w-full bg-blue-400">
// 				<form onSubmit={handleSubmit(onSubmit)}>
// 					<label>Name</label>
// 					<input
// 						class="border py-2 px-3 text-grey-800"
// 						type="text"
// 						placeholder="Name"
// 						{...register("name", {})}
// 					/>
// 					<input
// 						class="border py-2 px-3 text-grey-800"
// 						type="text"
// 						placeholder="Direction"
// 						{...register("direction", {})}
// 					/>
// 					<input
// 						class="border py-2 px-3 text-grey-800"
// 						type="text"
// 						placeholder="Doortype"
// 						{...register("doortype", {})}
// 					/>
// 					<input
// 						class="border py-2 px-3 text-grey-800"
// 						type="text"
// 						placeholder="FromArea"
// 						{...register("from_area", {})}
// 					/>
// 					<input
// 						class="border py-2 px-3 text-grey-800"
// 						type="text"
// 						placeholder="ToArea"
// 						{...register("to_area", {})}
// 					/>
// 					{/* <input class="border py-2 px-3 text-grey-800"  type="text" placeholder="FromRoom" {...register} />
//       <input class="border py-2 px-3 text-grey-800"  type="text" placeholder="ToRoom" {...register} /> */}

// 					<input
// 						class="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded"
// 						type="submit"
// 					/>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }
