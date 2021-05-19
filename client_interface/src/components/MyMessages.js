import React, { useState, Text } from "react";
import { Button, Form, Row, Card } from 'react-bootstrap';
import AppScreen from "./AppScreen";
import MessageCard from "./MessageCard";

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
            <AppScreen title="My Messages">
                <div style={styles.div}>
                    <MessageCard 
                        sender="John Smith" 
                        content="Hello William, how are you doing?"
                        timestamp="19/05/2021 - 23:35"
                    />
                    <MessageCard 
                        sender="John Smith" 
                        content="Hello William, how are you doing?"
                        timestamp="19/05/2021 - 23:35"
                    />
                    <MessageCard 
                        sender="John Smith" 
                        content="Hello William, how are you doing?"
                        timestamp="19/05/2021 - 23:35"
                    />
                    <MessageCard 
                        sender="John Smith" 
                        content="Hello William, how are you doing?"
                        timestamp="19/05/2021 - 23:35"
                    />
                </div>
            </AppScreen>
    );
}

const styles = {
    div: {
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        backgroundColor: 'darkGray',
        width: '70%',
        margin: 'auto',
        paddingLeft: '50px',
        paddingRight: '50px',
        paddingBottom: '30px',
        marginTop: '75px',
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
    },
    pageTitle: {
        fontSize: 36, 
        color: 'white', 
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        width: '100%', 
        backgroundColor: 'lightGray',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        marginTop: '30px',
    }
}

export default MyMessages;