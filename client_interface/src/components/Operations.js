
import React, { Component } from "react";
import { Button, Form, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import AppScreen from "./AppScreen";

class Operations extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "", 
            sqrt: "", 
            cbrt: "", 
            nrt: "",
            sqrtOperand: "",
            cbrtOperand: "",
            nrtOperand: "",
            nrtRoot: "",
        };
        this.requestSqrt = this.requestSqrt.bind(this);
        this.requestCbrt = this.requestCbrt.bind(this);
        this.requestNrt = this.requestNrt.bind(this);
    }

    async requestSqrt(e) {
        e.preventDefault();
        fetch(`http://localhost:${process.env.REACT_APP_PORT}/sqrt?number=${this.state.sqrtOperand}`)
            .then(res => res.text())
            .then(res => { this.setState({ sqrt: res }) })
            .catch(err => err);
    } 

    async requestCbrt(e) {
        e.preventDefault();
        fetch(`http://localhost:${process.env.REACT_APP_PORT}/cbrt?number=${this.state.cbrtOperand}`)
            .then(res => res.text())
            .then(res => { this.setState({ cbrt: res }) })
            .catch(err => err);
    } 

    async requestNrt(e) {
        e.preventDefault();
        fetch(`http://localhost:${process.env.REACT_APP_PORT}/nrt?number=${this.state.nrtOperand}&root=${this.state.nrtRoot}`)
            .then(res => res.text())
            .then(res => { this.setState({ nrt: res }) })
            .catch(err => err);
    } 

    render() {
        return (
            <AppScreen title="Operations">
                <div className="App" style={styles.div}>
                    <Row style={styles.row}>
                        <Form>
                            <Form.Group controlId="number">
                                <Form.Label style={styles.labelStyle}>Square Root Operation</Form.Label>
                                <Form.Control type="number" placeholder="Enter number" onChange={e => this.setState({ sqrtOperand: e.target.value })} />
                                <Form.Text className="text-dark">
                                    Operand of the square root operation
                                </Form.Text>
                            </Form.Group>

                            <p className="App-intro">{this.state.sqrt}</p>

                            <Button variant="dark" type="submit" onClick={this.requestSqrt}>
                                Calculate
                            </Button>
                        </Form>
                    </Row>
                    <Row style={styles.row}>
                        <Form>
                            <Form.Group controlId="number">
                                <Form.Label style={styles.labelStyle} >Cubic Root Operation</Form.Label>
                                <Form.Control type="number" placeholder="Enter number" onChange={e => this.setState({ cbrtOperand: e.target.value })} />
                                <Form.Text className="text-dark">
                                    Operand of the cubic root operation
                                </Form.Text>
                            </Form.Group>

                            <p className="App-intro">{this.state.cbrt}</p>

                            <Button variant="dark" type="submit" onClick={this.requestCbrt}>
                                Calculate
                            </Button>
                        </Form>
                    </Row>
                    <Row style={styles.row}>
                        <Form>
                            <Form.Label style={styles.labelStyle}>N Root Operation</Form.Label>
                            <Form.Group controlId="number">
                                <Form.Control type="number" placeholder="Enter number" onChange={e => this.setState({ nrtOperand: e.target.value })} />
                                <Form.Text className="text-dark">
                                    Operand of the n root operation
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="root">
                                <Form.Control type="number" placeholder="Enter root" onChange={e => this.setState({ nrtRoot: e.target.value })} />
                                <Form.Text className="text-dark">
                                    Root of the n root operation
                                </Form.Text>
                            </Form.Group>

                            <p className="App-intro">{this.state.nrt}</p>

                            <Button variant="dark" type="submit" onClick={this.requestNrt}>
                                Calculate
                            </Button>
                        </Form>
                    </Row>
                </div>
            </AppScreen>
        );
    }
}

const styles = {
    div: {
        backgroundColor: 'black',
    },
    row: {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        borderRadius: '15px',
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
    },
    labelStyle: {
        fontWeight: 'bold',
        fontSize: 18 
    }
}

export default Operations;