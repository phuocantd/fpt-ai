import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/home";
import TextToSpeedPage from "./pages/text-to-speed";
import SpeedToTextPage from "./pages/speed-to text";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/text-to-speed">
            <TextToSpeedPage />
          </Route>
          <Route exact path="/speed-to-text">
            <SpeedToTextPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
