require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const { errorHandler } = require("./middleware");
const client = require("./db");

const app = express();

const { SERVER_PORT } = process.env;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(morgan("dev"));

async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

const port = SERVER_PORT || 4000;

app.use("/api/v1/todos", todoRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  connectToDb();
});
