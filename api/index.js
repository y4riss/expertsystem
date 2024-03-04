const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth"));
app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
