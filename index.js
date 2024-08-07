require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const attendanceRoutes = require("./routes/attendance");

app.options("*", cors());
app.use(cors());

const mongoURI = process.env.DATABASE_URI; // Replace with your MongoDB URI
mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB:", err);
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(cors({ origin: "*", credentials: true }));

app.get("/test", (req, res) => res.send("Testing this works"));

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/attendance", attendanceRoutes);

app.listen(process.env.PORT || 5300, () =>
  console.log("Server ready on port 5300.")
);

module.exports = app;
