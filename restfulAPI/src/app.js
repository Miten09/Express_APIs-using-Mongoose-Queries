const express = require("express");
const app = express();
const mongo = require("./db/connection");
const Student = require("./models/students");

const port = process.env.PORT || 3000;

app.use(express.json());

// app.post("/students", (req, res) => {
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => res.status(201).send(user))
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });

// CREATE STUDENTS USING POST

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);

    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET STUDENTS USING GET REQUEST

app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(200).send(studentsData);
  } catch (error) {
    res.send(400).send(error);
  }
});

// GET INIDIVIDUAL STUDENTS DATA USING HIS ID

// app.get("/students/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     console.log(_id);
//     const studentData = await Student.findById(_id);
//     res.status(201).send(studentData);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// GET INIDIVIDUAL STUDENTS DATA USING HIS NAME

app.get("/students/:name", async (req, res) => {
  try {
    const OriginalName = req.params.name;
    console.log(OriginalName);
    const studentData = await Student.find({ name: OriginalName });
    res.status(201).send(studentData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// UPDATE STUDENTS DATA USING HIS ID

app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const updatedStudents = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updatedStudents);
  } catch (error) {
    res.status(404).send(error);
  }
});

// DELETE STUDENTS DATA USING HIS ID

app.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(_id);
    res.send(deleteStudent);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
