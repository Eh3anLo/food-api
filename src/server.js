require("dotenv").config()
const express = require("express");
const authRoutes = require('./routes/auth.route')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/auth", authRoutes) 


app.get("/", (req, res) => {
  res.send("root");
});


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
