import React, { useState } from "react";
import AppScreen from "./AppScreen";
import MessageCard from "./MessageCard";

function MyMessages() {

    const messages = [
        {
            sender: "John Smith",
            content: "Hello William, how are you doing?",
            timestamp: "19/05/2021 - 23:35"
        },
        {
            sender: "John Smith",
            content: "Hello William, how are you doing?",
            timestamp: "19/05/2021 - 23:35"
        },
        {
            sender: "John Smith",
            content: "Hello William, how are you doing?",
            timestamp: "19/05/2021 - 23:35"
        }
    ];

    return (
            <AppScreen title="My Messages">
                <div style={styles.div}>
                    {messages.map((message) => {
                        return (
                            <MessageCard
                                sender={message.sender}
                                content={message.content}
                                timestamp={message.timestamp}
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