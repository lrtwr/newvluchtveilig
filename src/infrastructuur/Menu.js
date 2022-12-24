import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { ReactComponent as Logo } from "./logo.svg";

export default function Menu() {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="/">
				{/* <Logo
          alt=""
          width="30"
          height="30"
          className="d-inline-block align-top"
        /> */}
        Vluchtveilig
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/wizard">Wizard</Nav.Link>
          <NavDropdown title="Invoer" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/companies">Bedrijf</NavDropdown.Item>
            <NavDropdown.Item href="/buildings">Gebouwen</NavDropdown.Item>
            <NavDropdown.Item href="/floors">Etages</NavDropdown.Item>
            <NavDropdown.Item href="/areas">Areas</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/doors">Deuren</NavDropdown.Item>
            <NavDropdown.Item href="/stairs">Trappen</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Test" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/reactflowtest">
              React Flow Test Vincent
            </NavDropdown.Item>
            <NavDropdown.Item href="/reactflowppp">
              React Flow Test PPP
            </NavDropdown.Item>
            <NavDropdown.Item href="/filldb">Database vullen met basic data</NavDropdown.Item>
            <NavDropdown.Item href="/clearsessionmemory">Clear Session Memory</NavDropdown.Item>
            <NavDropdown.Item href="/testcomponent">Test Component</NavDropdown.Item>
            <NavDropdown.Item href="/doorlistform">Door List Form</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="/whoami">Info</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
