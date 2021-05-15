import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        console.log("Username = " + username);
        console.log("Password = " + password);
        setFeedback("Login feedback"); // TODO: only display if credentials are not valid
    }

    return (
        <div style={styles.div}>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label style={styles.label}>Username</Form.Label>
                    <Form.Control placeholder="Username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <p>{feedback}</p>

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