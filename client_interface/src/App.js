
import React, { Component } from "react";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Operations from "./components/Operations";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from "./components/Login";
import Register from "./components/Register";
import TopBar from "./components/TopBar";
import SendMessage from "./components/SendMessage";
import MyMessages from "./components/MyMessages";

class App extends Component {
    componentDidMount() {
        document.body.style.backgroundColor = "black";
    }

    render() {
        return (
            <Router>
                <TopBar/>
                <Switch>
                    <Route path="/operations" component={Operations}/>
                    <Route path="/messages" component={MyMessages}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/sendMessage" component={SendMessage}/>
                    <Route path="/" component={Login}/>
                </Switch>
            </Router>
        );
    }
}

export default App;