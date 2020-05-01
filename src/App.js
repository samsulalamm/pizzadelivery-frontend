import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Main from "./views/Main";
import Checkout from "./views/Checkout";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          {/*<Home />*/}
          <Main />
        </Route>

        <Route exact path="/checkout">
          <Checkout/>
        </Route>

        <Route path="*">
          <h4>404 | Not found</h4>
        </Route>
      </Switch>
    </>
  );
};

export default App;
