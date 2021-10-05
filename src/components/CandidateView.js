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
import { useHistory, useParams } from "react-router-dom";

import { baseConfig } from "../query";
import { Grid, Flex, StyledCard } from "./common";

function Candidate() {
  const [candidate, setCandidate] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios(`/candidate/${id}`, baseConfig)
        .then((response) => setCandidate(response.data.data))
        .finally(() => setLoading(false))
        .catch((error) => console.error(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`/candidate/${id}`, baseConfig)
      .then((response) => history.push("/"))
      .finally(() => setLoading(false))
      .catch((error) => console.error(error));
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
      <Jumbotron>
        <Button onClick={() => history.push("/")}>Go back</Button>
      </Jumbotron>
      <Grid style={{ margin: "1rem" }}>
        <StyledCard>
          <Card.Header style={{ textAlign: "center" }}>
            {candidate.name}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Button>
                Challenges Solved<Badge> {candidate.challengesSolved}</Badge>
              </Button>
            </Card.Text>
            <Card.Text>
              <Button>
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
                onClick={() => history.push(`/candidate/${candidate._id}/edit`)}
              >
                Edit
              </Button>
              <Button variant="primary">Vote</Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </Card.Footer>
        </StyledCard>
      </Grid>
    </>
  );
}

export default Candidate;
