import { Card } from 'react-bootstrap';

function MessageCard(props) {
    return (
        <Card style={styles.card}>
            <Card.Body>
                <Card.Title>{props.sender}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.timestamp}</Card.Subtitle>
                <Card.Text>
                    {props.content}
                </Card.Text>
                <Card.Link href='/sendMessage?username=JohnSmit' style={{ color: 'black' }}>Reply</Card.Link>
            </Card.Body>
        </Card>
    );
}

const styles = {
    card: {
        width: '100%',
        backgroundColor: 'lightGray',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        marginTop: '30px',
    }
}

export default MessageCard;