const jwt = require("jsonwebtoken");
const db = require("../database/db");
require("dotenv").config();

const findUser = async (username) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("SELECT * FROM Admin WHERE username = ?");
    stmt.get(username, (err, row) => {
      if (err) {
        reject(new Error("Error retrieving user"));
        return;
      }
      stmt.finalize();
      if (!row) {
        reject(new Error("User not found"));
        return;
      }
      resolve(row);
    });
  });
};

const requireAuth = async (req, res, next) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie) return res.status(401).json({ error: "Unauthorized" });
  let token = undefined;
  try {
    token = cookie.access_token;
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const user = await findUser(payload.username);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorizedr" });
  }
};

module.exports = { requireAuth, findUser };
