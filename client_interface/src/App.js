
import React, { Component } from "react";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Operations from "./components/Operations";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Operations/>
        );
    }
}

export default App;