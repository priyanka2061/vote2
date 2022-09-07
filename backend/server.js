const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;

const api = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", api);

app.listen(port, () => {
  console.log(`port started at ${port}`);
});
