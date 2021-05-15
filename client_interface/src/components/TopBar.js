import React from "react";
import 'react-pro-sidebar/dist/css/styles.css';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../images/logo.png';


function TopBar() {
    return (
        <Navbar bg="dark" variant="dark" className="mb-5">
            <Nav.Link href="/"><img src={logo} alt="Logo" style={{height: '62px', width: '200px'}}/></Nav.Link>
            <Nav className="mr-auto">
            <Nav.Link href="operations" style={styles.navOption}>Operations</Nav.Link>
            <Nav.Link href="messages" style={styles.navOption}>Messages</Nav.Link>
            </Nav>
        </Navbar>
    );
}

const styles = {
    navOption: {
        marginLeft: '30px',
        fontSize: '18px',
    }
}

export default TopBar;