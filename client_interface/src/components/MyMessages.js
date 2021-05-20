import React, { useState, useEffect } from "react";
import AppScreen from "./AppScreen";
import MessageCard from "./MessageCard";

function MyMessages() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:${process.env.REACT_APP_PORT}/messages`)
            .then(res => { if (res.status === 200) res.json().then((result) => {setMessages(result)})})
            .catch(err => err);
    }, [messages]);

    function getReadableTimestamp(timestamp) {
        try {
            let pieces = timestamp.split("T");
            let day = pieces[0];
            let hour = pieces[1].split(".")[0];
            return day + " " + hour;
        } catch (error) {
            return "";
        }
        
    }

    return (
        <AppScreen title="My Messages">
            <div style={styles.div}>
                {messages.map((message, index) => {
                    return (
                        <MessageCard
                            sender={message.sender}
                            content={message.content}
                            timestamp={getReadableTimestamp(message.timestamp)}
                            key={index}
                        />
                    );
                })}
                
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
    }
}

export default MyMessages;