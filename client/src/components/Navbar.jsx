import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export class navbar extends Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">React-Keycloak-App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="http://localhost:8080/auth/realms/Demo-Realm/account/">Profile</Nav.Link>
                            {this.props.keycloak.hasResourceRole('user') && (
                                <Nav className="me-auto">
                                    <Nav.Link href="/cources">Upisani predmeti</Nav.Link>
                                    <Nav.Link href="/grades">Ocjene</Nav.Link>
                                </Nav>
                            )}
                            {this.props.keycloak.hasResourceRole('admin') && (
                                <Nav className="me-auto">
                                    <Nav.Link href="/cources">Predmeti</Nav.Link>
                                    <Nav.Link href="/students">Studenti</Nav.Link>
                                </Nav>
                            )}
                            <Nav.Link onClick={() => this.props.keycloak.logout()}>Odjava</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        );
    }
}

export default navbar;
