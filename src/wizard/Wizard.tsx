import React, { useEffect, useState, useCallback } from "react";
import {
	FormGroup,
	Tab,
	Tabs,
	Card,
	Table,
	Form,
} from "react-bootstrap";
import ReactFlowFloor from "../reactflow/ReactFlowFloor.js";
import * as t from "../tools/LeerTools.tsx";
import { useAsyncGetAll } from "../tools/useAsync";
import * as events from "../infrastructuur/InfraEvents";
import SmallFloorList from "./componenten/SmallFloorList";
import SmallBuildingList from "./componenten/SmallBuildingList";
import SmallCompanyList from "./componenten/SmallCompanyList";
import ReactFlowFloorReport from "../reactflow/ReactFlowFloorReport";
import "./WizardStyle.css";

export default function Wizard(props) {
	props = { ...props };
	const headerTitle = "Vluchtroute registratie";
	const [tab, setTab] = useState("");
	const resCompany = useAsyncGetAll("company");
	const resBuilding = useAsyncGetAll("building");
	const resFloor = useAsyncGetAll("floor", (response) =>
		response.data
			.sort(function (a, b) {
				return a.floornumber - b.floornumber;
			})
			.reverse()
	);

	useEffect(() => {
		if (!Array.isArray(t.getSesMemArr("SelectedTab"))) {
			setTab(t.getSesMemArr("SelectedTab"));
		} else {
			setTab("Company");
		}
	}, []);

	const onSelectTab = useCallback(
		(tab) => {
			t.setSesMemObj("SelectedTab", tab);
			setTab(tab);
		},
		[tab]
	);

	const onRowClick = useCallback(
		(model) => {
			let newTab = "";
			switch (tab) {
				case "Company":
					newTab = "Building";
					t.setSesMemObj("SelectedCompany", model);
					sessionStorage.removeItem("SelectedBuilding");
					sessionStorage.removeItem("SelectedFloor");
					sessionStorage.removeItem("SelectedReactFlow");
					break;
				case "Building":
					newTab = "Floor";
					t.setSesMemObj("SelectedBuilding", model);
					sessionStorage.removeItem("SelectedFloor");
					sessionStorage.removeItem("SelectedReactFlow");
					break;
				case "Floor":
					newTab = "ReactFlow";
					t.setSesMemObj("SelectedFloor", model);
					sessionStorage.removeItem("SelectedReactFlow");
					break;
				case "ReactFlow":
					newTab = "Report";
					t.setSesMemObj("SelectedReactFlow", model);
					break;
			}
			setTab(newTab);
			t.setSesMemObj("SelectedTab", newTab);
		},
		[resCompany, resBuilding, resFloor, tab]
	);

	const SubTitle = () => {
		let text = "";
		switch (tab) {
			case "Company":
				text = "Kies een bedrijf";
				break;
			case "Building":
				text = "Kies een gebouw";
				break;
			case "Floor":
				text = "Kies een verdieping";
				break;
			case "ReactFlow":
				text = "Definieer de ruimtes.";
				break;
			case "Report":
				text = "Vluchtroute report";
				break;
		}
		return <>{text && <h6>&nbsp;&nbsp;&nbsp;{text}</h6>}</>;
	};

	if (resCompany.error || resBuilding.error || resFloor.error)
		return (
			<>
				{resCompany.error && (
					<>
						<events.onError
							source="Wizard"
							tableName="company"
							error={resCompany.error}
						/>
					</>
				)}
				{resBuilding.error && (
					<>
						<events.onError
							source="Wizard"
							tableName="building"
							error={resBuilding.error}
						/>
					</>
				)}
				{resFloor.error && (
					<>
						<events.onError
							source="Wizard"
							tableName="floor"
							error={resFloor.error}
						/>
					</>
				)}
			</>
		);

	if (!resCompany.isLoaded || !resBuilding.isLoaded || !resFloor.isLoaded)
		return <p>...loading</p>;
	const ErrorCard = (props) => {
		const source = props?.source ? props.source : undefined;
		const tableName = props?.tableName ? props.tableName : undefined;
		const errorMessage = props?.errorMessage ? props.errorMessage : undefined;

		const form = (
			<Card hidden className="bg-danger text-light">
				<Card.Text>
					<FormGroupLabel label={"Bron"} text={source} />
					<FormGroupLabel label={"Tabel"} text={tableName} />
					<FormGroupLabel label={"Bericht"} text={errorMessage} />
				</Card.Text>
			</Card>
		);
		return form;
	};
	const OrientationCard = () => {
		const company = t.getSesMemObj("SelectedCompany");
		const building = t.getSesMemObj("SelectedBuilding");
		const floor = t.getSesMemObj("SelectedFloor");

		const companyText = company ? company.name : "Niet geselecteerd.";
		const buildingText = building ? building.name : "Niet geselecteerd.";
		const floorText = floor ? floor.name : "Niet geselecteerd.";
		const form = (
			<Card className="bg-success text-light">
				<Card.Text>
					<FormGroupLabel label={"Bedrijf"} text={companyText} />
					<FormGroupLabel label={"Gebouw"} text={buildingText} />
					<FormGroupLabel label={"Verdieping"} text={floorText} />
				</Card.Text>
			</Card>
		);
		return form;
	};

	const FormGroupLabel = (props) => {
		return (
			<FormGroup>
				<label>{props.label + ": " + props.text}</label>
			</FormGroup>
		);
	};

	return (
		<>
			<Form style={{ width: "calc(100vw - 35px", marginLeft: 15 }}>
				<Table width="100%">
					<tr>
						<td width="50%">
							<FormGroup>
								<h3>{headerTitle}</h3>
							</FormGroup>
						</td>
						<td width="25%">
							<ErrorCard
								source="source"
								tableName="tableName"
								errorMessage="errorMessage"></ErrorCard>
						</td>
						<td height="100px" width="25%">
							<OrientationCard />
						</td>
					</tr>
				</Table>

				<SubTitle />
				<Tabs
					id="tabs"
					activeKey={tab}
					className="myTabs"
					// className="bg-success text-light"
					onSelect={(k) => onSelectTab(k)}
					// className="mb-2"
					justify>
					<Tab eventKey="Company" title="Bedrijf">
						{tab === "Company" && (
							<SmallCompanyList
								resCompany={resCompany}
								onRowClick={onRowClick}
							/>
						)}
					</Tab>
					<Tab eventKey="Building" title="Gebouw">
						{tab === "Building" && t.getSesMemObj("SelectedCompany") ? (
							<SmallBuildingList
								resBuilding={resBuilding}
								onRowClick={onRowClick}
							/>
						) : (
							<h4>Kies eerst een bedrijf.</h4>
						)}
					</Tab>
					<Tab eventKey="Floor" title="Verdieping">
						{tab === "Floor" && t.getSesMemObj("SelectedBuilding") ? (
							<SmallFloorList resFloor={resFloor} onRowClick={onRowClick} />
						) : (
							<h4>Kies eerst een gebouw.</h4>
						)}
					</Tab>
					<Tab eventKey="ReactFlow" title="Vluchtroute">
						{tab === "ReactFlow" && t.getSesMemObj("SelectedFloor") ? (
							<>
								<ReactFlowFloor
									floor={t.getSesMemObj("SelectedFloor")}></ReactFlowFloor>
							</>
						) : (
							<h4>Kies eerst een Verdieping</h4>
						)}
					</Tab>
					<Tab eventKey="Report" title="Overzicht vluchtroutes">
						{tab === "Report" && <ReactFlowFloorReport />}
					</Tab>
				</Tabs>
			</Form>
		</>
	);
}
