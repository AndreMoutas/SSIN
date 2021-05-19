import React, { useState } from "react";
import { Button, Form, Row } from 'react-bootstrap';

function SendMessage() {

    const [receiver, setReceiver] = useState("");
    const [message, setMessage] = useState("");
    const [feedback, setFeedback] = useState("");

    async function sendMessage(e) {
        e.preventDefault();

        let body = { receiver: receiver, message: message };
        fetch(`http://localhost:${}/message`, {
            method: "GET",
            body: JSON.stringify(body),
            headers: { 'Message-Type': 'application/json' },
        })
            .then(res => res.status)
            .then(status => handleLoginResponse(status))
            .catch(err => err);
    }

    function handleLoginResponse(status) {
        
        if (status !== 200) {
            setFeedback("User is likely offline!");
        } else {
            setReceiver("");
            setMessage("");
            setFeedback("Message sent!")
        }
    }

    return (
        <div style={styles.div}>
            <Form>
                <Form.Group controlId="receiver">
                    <Form.Label style={styles.label}>Receiver</Form.Label>
                    <Form.Control value={receiver} placeholder="Username" onChange={e => setReceiver(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="message">
                    <Form.Label style={styles.label}>Message</Form.Label>
                    <Form.Control value={message} type="text" as="textarea" rows="3" placeholder="Message" onChange={e => setMessage(e.target.value)} />
                </Form.Group>

                <p>{feedback}</p>

                <Row style={styles.row}>
                    <Button variant="dark" type="submit" onClick={sendMessage} >
                        Send
                    </Button>
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
        justifyMessage: 'space-between'
    }
}

export default SendMessage;