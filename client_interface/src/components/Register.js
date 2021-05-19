import React, { useState } from "react";
import { Button, Form, Row } from 'react-bootstrap';

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [oneTimeID, setOneTimeID] = useState("");
    const [feedback, setFeedback] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        
        let body = {username: username, password: password, oneTimeID: oneTimeID};
        fetch(`http://localhost:${process.env.REACT_APP_PORT}/register`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.status)
            .then(status => handleRegisterResponse(status))
            .catch(err => err);
    }

    function handleRegisterResponse(status) {
        if (status !== 200) {
            setFeedback("Wrong username or one time ID");
            setPassword("");
        } else {
            window.location.href = '/operations';
        }
    }

    return (
        <div style={styles.div}>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label style={styles.label}>Username</Form.Label>
                    <Form.Control value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="oneTimeID">
                    <Form.Label style={styles.label}>One Time ID</Form.Label>
                    <Form.Control value={oneTimeID} placeholder="One Time ID" onChange={e => setOneTimeID(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>


                <p>{feedback}</p>

                <Row style={styles.row}>
                    <Button variant="dark" type="submit" onClick={handleRegister} >
                        Register
                    </Button>
                    <a style={styles.link} href="/">Já possui conta?</a>
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

export default Register;