
import React, { Component } from "react";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Operations from "./components/Operations";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from "./components/Login";
import Messages from "./components/Messages";
import TopBar from "./components/TopBar";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <TopBar/>
                <Switch>
                    <Route path="/operations" component={Operations}/>
                    <Route path="/messages" component={Messages}/>
                    <Route path="/" component={Login}/>
                </Switch>
            </Router>
        );
    }
}

export default App;