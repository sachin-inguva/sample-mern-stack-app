import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import { Flex } from "./components/common";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = lazy(() => import("./components/Home"));
const CandidateView = lazy(() => import("./components/CandidateView"));
const NewCandidate = lazy(() => import("./components/NewCandidate"));
const EditCandidate = lazy(() => import("./components/EditCandidate"));

const Section = ({ children }) => (
  <Suspense
    fallback={
      <Flex justify="center" align="center">
        <Spinner animation="border" />;
      </Flex>
    }
  >
    <div style={{ margin: "0 5rem" }}>{children}</div>
  </Suspense>
);

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          children={
            <Section>
              <Home />
            </Section>
          }
        />
        <Route
          exact
          path="/candidate/new"
          children={
            <Section>
              <NewCandidate />
            </Section>
          }
        />
        <Route
          exact
          path="/candidate/:id/edit"
          children={
            <Section>
              <EditCandidate />
            </Section>
          }
        />
        <Route
          exact
          path="/candidate/:id"
          children={
            <Section>
              <CandidateView />
            </Section>
          }
        />
        <Route
          path="*"
          children={
            <div style={{ textAlign: "center" }}>Page Not Found...</div>
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
