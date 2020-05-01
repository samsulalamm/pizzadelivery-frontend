import React from "react";
import {Switch, Route} from "react-router-dom";
import Main from "./views/Main";
import Orderhistory from "./views/Orderhistory";
import Header from "./layouts/Header";

const App = () => {
    return (
        <>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route exact path="/order-history">
                    <Orderhistory/>
                </Route>
            </Switch>
        </>
    );
};

export default App;
