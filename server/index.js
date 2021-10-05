const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Candidate } = require("./model/Candidate");

const app = express();
const port = 4000;

// middleware
app.use(cors());
app.use(express.json());

// endpoints
app.get("/", (req, res) => res.send("Hello"));

app.get("/candidates", (req, res) => {
  Candidate.find().then((candidates, err) => {
    if (err) {
      return res.send({ error: err });
    }
    return res.send({ data: candidates });
  });
});

app.get("/candidate/:id", (req, res) => {
  const { id } = req.params;
  Candidate.findById(id, (err, candidate) => {
    if (err) {
      return res.send({ error: err });
    }
    return res.send({ data: candidate });
  });
});

app.post("/candidate", (req, res) => {
  const newCandidate = new Candidate(req.body);
  newCandidate.save((err, candidate) => {
    if (err) {
      return res.send({ error: err });
    }
    return res.send({ data: candidate });
  });
});

app.put("/candidate/:id", (req, res) => {
  const { id } = req.params;
  return Candidate.findById(id, (err, candidate) => {
    if (err) {
      return res.send({ error: err });
    }
    candidate.update(req.body, (err) => {
      if (err) {
        return res.send({ error: err });
      }
      return res.send({ message: "Successfully updated!" });
    });
  });
});

app.delete("/candidate/:id", (req, res) => {
  const { id } = req.params;
  return Candidate.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.send({ error: err });
    }
    return res.send({ message: "Successfully deleted!" });
  });
});

app.put("/candidate/:id/vote", (req, res) => {
  const { id } = req.params;
  return Candidate.findById(id, (err, candidate) => {
    if (err) {
      return res.send({ error: err });
    }
    candidate.update(req.body, (err) => {
      if (err) {
        return res.sendStatus(500).send({ error: err });
      }
      return res.send({ message: "Successfully updated!" });
    });
  });
});

//init
mongoose
  .connect("mongodb://localhost/test", { useNewUrlParser: true })
  .then(() => {
    console.log(`connected at mongodb://localhost/test`);
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch(console.error.bind(console, "connection error:"));
