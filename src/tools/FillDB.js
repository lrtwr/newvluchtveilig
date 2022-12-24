import React from "react";
import api from "../services/ApiService";
import * as t from "./LeerTools.tsx";

export default function FillDB() {
	React.useEffect(() => {
		createCompanies();

		createEscapeRouteTypes();
	}, []);
}

function createCompanies() {
	let companies = [];

	api.getAll("company", (response, error) => {
		if (response) {
			companies = response.data;
			if (
				companies.filter((option) => {
					return option.name === "Leertouwer BV";
				}).length == 0
			) {
				api.post("company", { name: "Leertouwer BV" }, (response, error) => {
					if (response) createBuildings({ id: response.data.id });
					if (error) {
					}
				});
			}
		}
		if (error) {
		}
	});
}

function createBuildings(props) {
	api.post(
		"building",
		{ name: "Leertouwer Main building", company: { id: props.id } },
		(response, error) => {
			if (response) {
				createFloors({ id: response.data.id });
			}
			if (error) {
			}
		}
	);
	api.post("building", {
		name: "Leertouwer Groningen",
		company: { id: props.id },
	});
	api.post("building", {
		name: "Leertouwer Amersfoort",
		company: { id: props.id },
	});
	api.post("building", {
		name: "Leertouwer Bremen",
		company: { id: props.id },
	});
	return (
		<>
			<h1>Done building</h1>
		</>
	);
}

function createFloors(props) {
	api.post("floor", {
		name: "Begane grond",
		floornumber: 0,
		building: { id: props.id },
	});
	api.post("floor", {
		name: "Eerste verdieping",
		floornumber: 1,
		building: { id: props.id },
	});
	api.post("floor", {
		name: "Tweede verdieping",
		floornumber: 2,
		building: { id: props.id },
	});
	api.post("floor", {
		name: "Kelder",
		floornumber: -1,
		building: { id: props.id },
	});
	createAreaTypes();
	return (
		<>
			<h1>Done floor</h1>
		</>
	);
}

function createAreaTypes() {
	api.post("areatype", { name: "Subbrandcompartiment", shortname: "SBC" });
	api.post("areatype", { name: "Doorgang", shortname: "Doorgang" });
	api.post("areatype", { name: "Trappenruimte", shortname: "Trap" });
	api.post("areatype", { name: "Veilige omgeving", shortname: "Exit" });
	return (
		<>
			<h1>Done areatype</h1>
		</>
	);
}

function createEscapeRouteTypes() {
	let escapeRouteTypes = [];

	api.getAll("escaperoutetype", (response, error) => {
		if (response) {
			escapeRouteTypes = response.data;
			if (
				escapeRouteTypes.filter((option) => {
					return option.name === "Geen vluchtroute";
				}).length == 0
			) {
				api.post("escaperoutetype", { name: "Geen vluchtroute" });
				api.post("escaperoutetype", { name: "Vluchtroute" });
				api.post("escaperoutetype", { name: "Veilige vluchtroute" });
				api.post("escaperoutetype", { name: "Extra veilige vluchtroute" });
			}
		}
		if (error) {
		}
	});
}
