import React from "react";
import "./App.css";
import History from "./History";
import { Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Converter from "./Converter";

function App() {
  return (
    <Container className="App">
      <Col className="background">
        <Row>
          <Col className="mainTab mt-5 p-3 ">
            <h1>Konwerter walut</h1>
            <Converter />
          </Col>{" "}
          <Switch>
            <Route path="/" exact>
              <Col></Col>
            </Route>
            <Route path="/history" exact>
              <History />
            </Route>
          </Switch>
        </Row>
      </Col>
    </Container>
  );
}

export default App;
