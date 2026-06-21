const express = require("express");

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("root");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
