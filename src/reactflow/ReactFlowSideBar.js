import React from "react";
import { Card } from "react-bootstrap";

export function ReactFlowSideBar() {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	const spanButton = {
		marginRight: 4,
		FontFace: "bold",
		width: 230,
		textAllign: "center",
		allign: "center",
		// borderRadius: 3,
		// border: "1px fixed black",
		// borderStyle: "fixed",
		// borderColor: "black",
		// borderWidth: "1px",
		// margin: 2,
		// padding: 2,
	};

	const spanButtong = { ...spanButton };
	const spanButtony = { ...spanButton };
	const spanButtonb = { ...spanButton, backgroundColor: "blue" };
	const spanButtonp = { ...spanButton };

	const tdStyle = {};

	return (
		<>
			<div width="100%">
				<table style={{ marginLeft: "auto", marginRight: "auto" }}>
					<row>
						<td style={{ width: "caddlc(35%)" }}></td>
						<td style={tdStyle}>
							<Card
								data-toggle="tooltip"
								data-placement="top"
								title="Sleep het Sub-Brand-Compartiment naar het tekenvenster!"
								style={{ ...spanButtong }}
								className="bg-danger text-light text-center"
								onDragStart={(event) => onDragStart(event, "SBC")}
								draggable>
								<Card.Text textAllign="center" style={{ textAllign: "center" }}>
									Subbrandcompartiment
								</Card.Text>
							</Card>
						</td>
						<td style={tdStyle}>
							<Card
								data-toggle="tooltip"
								data-placement="top"
								title="Sleep de doorgangsruimte naar het tekenvenster!"
								style={spanButtony}
								className="bg-warning text-dark text-center"
								onDragStart={(event) => onDragStart(event, "Doorgang")}
								draggable>
								Doorgang
							</Card>
						</td>
						<td style={tdStyle}>
							<Card
								data-toggle="tooltip"
								data-placement="top"
								title="Sleep het trappenhuis naar het tekenvenster!"
								style={spanButtonb}
								className=" text-light text-center"
								onDragStart={(event) => onDragStart(event, "Trap")}
								draggable>
								Trappenruimte
							</Card>
						</td>
						<td style={tdStyle}>
							<Card
								data-toggle="tooltip"
								data-placement="top"
								title="Sleep de Exit naar het tekenvenster!"
								style={spanButtonp}
								className="bg-success text-light text-center"
								onDragStart={(event) => onDragStart(event, "Exit")}
								draggable>
								Buiten / Veilige ruimte
							</Card>
						</td>
					</row>
				</table>
			</div>
		</>
	);
}
