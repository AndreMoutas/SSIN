import React, { useState } from "react";
import { Button, Form, Row } from 'react-bootstrap';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        
        let body = {username: username, password: password};
        fetch("http://localhost:2000/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.status)
            .then(status => handleLoginResponse(status))
            .catch(err => err);
    }

    function handleLoginResponse(status) {
        if (status !== 200) {
            setPassword("");
            setFeedback("Wrong username or password");
        } else {
            window.location.reload();
        }
    }

    return (
        <div style={styles.div}>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label style={styles.label}>Username</Form.Label>
                    <Form.Control value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <p>{feedback}</p>

                <Row style={styles.row}>
                    <Button variant="dark" type="submit" onClick={handleLogin} >
                        Login
                    </Button>
                    <a style={styles.link} href="/register">Pretende fazer o registo?</a>
                </Row>
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
    },
    link: {
        alignSelf: 'center',
        color: 'black',
        marginRight: '1em'
    },
    row: {
        justifyContent: 'space-between'
    }
}

export default Login;