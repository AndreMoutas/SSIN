  
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
//import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
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
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                {/* <p className="App-intro">{this.state.apiResponse}</p> */}
                <Button variant="outline-primary" size="lg" backgroundColor="blue">
                    Secondary
                </Button>
            </div>
        );
    }
}

export default App;