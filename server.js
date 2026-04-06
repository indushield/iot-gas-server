const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// store latest values
let sensorData = {
  temperature: 0,
  humidity: 0,
  gas: 0
};

// ESP32 sends here
app.post("/update", (req, res) => {
  sensorData = req.body;
  console.log("📥 Data received:", sensorData);
  res.send("OK");
});

// Website fetches here
app.get("/data", (req, res) => {
  res.json(sensorData);
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));