
import React, { Component } from "react";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Operations from "./components/Operations";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SideBar from "./components/SideBar";
import Login from "./components/Login";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <SideBar/>
                <Switch>
                    <Route path="/operations" component={Operations}/>
                    <Route path="/" component={Login}/>
                </Switch>
            </Router>
        );
    }
}

export default App;