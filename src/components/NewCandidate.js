import React, { useState } from "react";
import { Button, Form, Spinner, Jumbotron } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { baseConfig } from "../query";
import { Flex } from "./common";

const initialData = {
  name: "",
  challengesSolved: "0",
  expertiseLevel: "0",
  expertIn: [],
};

function NewCandidate() {
  const [formData, setFormData] = useState({ ...initialData });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const appendFormData = (newData) =>
    setFormData((_data) => ({ ..._data, ...newData }));

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post("candidate", { ...formData }, baseConfig)
      .then(() => history.push("/"))
      .finally(() => setLoading(false));
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
        <Button variant="primary" onClick={() => history.push("/")}>
          Go back
        </Button>
        <h1>New Candidate</h1>
      </Jumbotron>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            placeholder="Enter name"
            onChange={({ target }) => appendFormData({ name: target.value })}
          />
          <Form.Text className="text-muted">Name of the Candidate</Form.Text>
        </Form.Group>
        <Form.Group controlId="challengesSolved">
          <Form.Label>Challenges Solved</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter a number"
            value={formData.challengesSolved}
            onChange={({ target }) =>
              appendFormData({ challengesSolved: target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="expertiseLevel">
          <Form.Label>Expertise Level</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter a number"
            value={formData.expertiseLevel}
            onChange={({ target }) =>
              appendFormData({ expertiseLevel: target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="expertIn">
          <Form.Label>Expert In</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter comma separated values"
            value={formData.expertIn.join()}
            onChange={({ target }) =>
              appendFormData({ expertIn: target.value.split(",") })
            }
          />
          <Form.Text className="text-muted">
            Enter the skills candidate is proficient with
          </Form.Text>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default NewCandidate;
