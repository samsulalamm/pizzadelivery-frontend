import React from "react";
import {Switch, Route} from "react-router-dom";
import Main from "./views/Main";

const App = () => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
            </Switch>
        </>
    );
};

export default App;
