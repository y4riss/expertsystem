const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../database/db");

const getUser = async (data) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("SELECT * FROM Admin WHERE username = ?");
    stmt.get(data.username, (err, row) => {
      if (err) {
        reject(new Error("invalid username or password"));
        return;
      }
      stmt.finalize();
      resolve(row);
    });
  });
};

const checkPassword = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  if (!match) throw Error("username or password incorrect");
  return match;
};

const login = async (req, res) => {
  const data = req.body;
  console.log("data : ", data);
  try {
    const user = await getUser(data);
    console.log("user : ", user);
    await checkPassword(data.password, user.password);
    const payload = {
      username: user.username,
    };
    const KEY = `${process.env.JWT_SECRET}`;
    const token = jwt.sign(payload, KEY, {
      expiresIn: "3d",
    });
    const { password, ...other } = user;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (error) {
    return res.status(401).json({ error: "username or password incorrect" });
  }
};

const logout = (req, res) => {
  console.log("logging out...");
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = {
  login,
  logout,
};
