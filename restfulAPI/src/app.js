const express = require("express");
const app = express();
const mongo = require("./db/connection");
const Student = require("./models/students");

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/students", (req, res) => {
  const user = new Student(req.body);
  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
