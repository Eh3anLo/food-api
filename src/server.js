require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.route");
const menuRoutes = require("./routes/menu.route");
const orderRoutes = require("./routes/order.route");
const { authenticate } = require("./middlewares/auth.middleware");
const { authorize } = require("./middlewares/role.middleware");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("root");
});

app.use("/menu", menuRoutes);
app.use("/auth", authRoutes);
app.use("/order", orderRoutes);

// // test auth middleware (jwt)
// app.get("/profile", authenticate, (req, res) => {
//   res.json({
//     "user": req.user
//   })
// })

// app.get("/admin", authenticate, authorize("ADMIN"), (req, res) => {
//   res.status(200).json({
//     "message" : "welcome admin"
//   })
// })

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
