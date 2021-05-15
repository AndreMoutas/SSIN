  
import React, { Component } from "react";
import { Button, Form, Row } from 'react-bootstrap';
//import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.png';
//import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    handle() {
        console.log("handling")
    }

    async callAPI() {
        /* fetch("http://localhost:2000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err); */
    }

    componentDidMount() {
        document.body.style.backgroundColor = "black"
        this.callAPI();
    }

    render() {
        return (
            <div className="App" style={styles.div}>
                <img src={logo} alt="Logo" />;
                {/* <p className="App-intro">{this.state.apiResponse}</p> */}
                <Row style={styles.row}>
                    <Form>
                        <Form.Group controlId="number">
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="email" placeholder="Enter number" />
                            <Form.Text className="text-muted">
                                Operand of the square root operation
                            </Form.Text>
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Calculate
                        </Button>
                    </Form>
                </Row>
                <Row style={styles.row}>
                    <Form>
                        <Form.Group controlId="number">
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="email" placeholder="Enter number" />
                            <Form.Text className="text-muted">
                                Operand of the square root operation
                            </Form.Text>
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Calculate
                        </Button>
                    </Form>
                </Row>
            </div>
        );
    }
}

const styles = {
    div: {
        backgroundColor: 'black',
    },
    row: {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        borderRadius: '30px',
        color: 'white',
        backgroundColor: 'darkGray',
        width: '50%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        marginBottom: '20px',
        marginTop: '20px',
    }
}

export default App;