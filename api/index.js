const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth"));
app.get(
  "/api",
  require("./middlewares/requireAuth").requireAuth,
  (req, res) => {
    const { password, ...other } = req.user;

    return res.json(other);
  }
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
