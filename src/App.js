import React from "react";
import { Route, Switch } from "react-router-dom";

import {
  LandingPage,
  LoginPage,
  RegisterPage,
  SpecialItemPage,
  ItemPage,
  CartPage,
  TokenOutputPage,
  OrderDetailsPage,
} from "./webViews";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/item/special" component={SpecialItemPage} />
      <Route exact path="/item" component={ItemPage} />
      <Route exact path="/cart" component={CartPage} />
      <Route exact path="/token" component={TokenOutputPage} />
      <Route exact path="/order" component={OrderDetailsPage} />
    </Switch>
  );
}
export default App;
