import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import List from "../List/index";

export default function() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={List}/>
            </Switch>
        </Router>
    )
}
