import React, { useState } from "react";
import { Button, Form, Row, Card } from 'react-bootstrap';

function MyMessages() {

    const [receiver, setReceiver] = useState("");
    const [message, setMessage] = useState("");
    const [feedback, setFeedback] = useState("");

    async function sendMessage(e) {
        e.preventDefault();

        let body = { receiver: receiver, message: message };
        fetch(`http://localhost:2000/message`, {
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
            <Card style={{ width: '100%', backgroundColor: 'lightGray' }}>
                <Card.Body>
                    <Card.Title>John Smith</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">19/05/2021 - 23:09</Card.Subtitle>
                    <Card.Text>
                        Hello William! It's me, John!!
                    </Card.Text>
                    <Card.Link href="#" style={{color: 'black'}}>Reply</Card.Link>
                </Card.Body>
            </Card>
            <Card style={{ width: '100%', backgroundColor: 'lightGray' }}>
                <Card.Body>
                    <Card.Title>John Smith</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">19/05/2021 - 23:09</Card.Subtitle>
                    <Card.Text>
                        Hello William! It's me, John!!
                    </Card.Text>
                    <Card.Link href="#" style={{color: 'black'}}>Reply</Card.Link>
                </Card.Body>
            </Card>
            <Card style={{ width: '100%', backgroundColor: 'lightGray' }}>
                <Card.Body>
                    <Card.Title>John Smith</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">19/05/2021 - 23:09</Card.Subtitle>
                    <Card.Text>
                        Hello William! It's me, John!!
                    </Card.Text>
                    <Card.Link href="#" style={{color: 'black'}}>Reply</Card.Link>
                </Card.Body>
            </Card>
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

export default MyMessages;