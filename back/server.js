const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/User");

const app = express();

// 中介軟體
app.use(bodyParser.json());
app.use(cors());

// MongoDB 連接
mongoose.connect("mongodb://localhost:27017/bentoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log("MongoDB 已連接"))
  .catch(err => console.log(err));

// API 路由

// 取得所有資料
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 新增資料
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send("使用者已新增");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 刪除資料
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteOne({ id });
    res.send("使用者已刪除");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 啟動伺服器
const PORT = 5000;
app.listen(PORT, () => console.log(`伺服器運行於 http://localhost:${PORT}`));
