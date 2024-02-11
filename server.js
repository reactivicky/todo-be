const express = require("express");
require("dotenv");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
