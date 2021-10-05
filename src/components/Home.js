import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Badge,
  Card,
  Spinner,
  Jumbotron,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { baseConfig } from "../query";
import { Grid, Flex, StyledCard } from "./common";

function Home() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    axios("/candidates", baseConfig)
      .then((response) => setCandidates(response.data.data))
      .finally(() => setLoading(false))
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Candidates = () => {
    if (candidates.length) {
      return candidates.map((candidate) => {
        return (
          <StyledCard key={candidate._id}>
            <Card.Header style={{ textAlign: "center" }}>
              {candidate.name}
            </Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
                <Button active>
                  Challenges Solved<Badge> {candidate.challengesSolved}</Badge>
                </Button>
              </Card.Text>
              <Card.Text>
                <Button active>
                  Level<Badge> {candidate.expertiseLevel}</Badge>
                </Button>
                <Button active>
                  Votes<Badge> {candidate.votes}</Badge>
                </Button>
              </Card.Text>
              <Card.Text>
                <ButtonGroup>
                  {candidate?.expertIn?.map((skill, idx) => {
                    return (
                      <Button key={`{skill}-${idx}`} active>
                        {skill}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ textAlign: "center" }}>
              <ButtonGroup>
                <Button
                  variant="primary"
                  onClick={() => history.push(`candidate/${candidate._id}`)}
                >
                  View
                </Button>
                <Button variant="primary">Vote</Button>
              </ButtonGroup>
            </Card.Footer>
          </StyledCard>
        );
      });
    }
    return <div style={{ textAlign: "center" }}>candidate not found...</div>;
  };

  if (loading) {
    return (
      <Flex justify="center" align="center">
        <Spinner animation="border" />;
      </Flex>
    );
  }

  return (
    <>
      <Jumbotron style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Candidates</h1>
        <Button variant="primary" onClick={() => history.push("candidate/new")}>
          + New Candidate
        </Button>
      </Jumbotron>
      <Grid style={{ margin: "1rem" }}>
        <Candidates />
      </Grid>
    </>
  );
}

export default Home;
