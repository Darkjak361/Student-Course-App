const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/students");
const courseRoutes = require("./routes/courses");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
