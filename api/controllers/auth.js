const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUser = async (data) => {
  const user = await prisma.admin.findUnique({
    where: {
      username: data.username,
    },
  });
  if (!user) throw Error("username or password incorrect");

  return user;
};

const checkPassword = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);

  if (!match) throw Error("username or password incorrect");
  return match;
};

const login = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const user = await getUser(data);
    console.log(user);
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
    return res.status(401).json({ error: error.message });
  }
};

const logout = (req, res) => {
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
