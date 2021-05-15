import React from "react";
import { Button, Form, Row } from 'react-bootstrap';

function Login() {

    function handleLogin() {

    }

    return (
        <div style={styles.div}>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label style={styles.label}>Username</Form.Label>
                    <Form.Control placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <p className="App-intro"></p>

                <Button variant="dark" type="submit" onClick={handleLogin} >
                    Login
                </Button>
            </Form>
        </div>
    );
}

const styles = {
    div: {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        borderRadius: '10px',
        backgroundColor: 'darkGray',
        width: '50%',
        margin: 'auto',
        padding: '25px',
        marginTop: '100px',
        
    },
    label: {
        color: 'white'
    }
}

export default Login;