const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

// ✅ ENV VARIABLES
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let client = null;

if (accountSid && authToken) {
client = twilio(accountSid, authToken);
console.log("✅ Twilio Ready");
} else {
console.log("⚠ Twilio ENV missing");
}

// ✅ TEST ROUTE
app.get("/", (req, res) => {
res.send("Server Running ✅");
});

// ✅ STORE DATA FROM ESP
let latestData = {
gas: 0,
temperature: 0,
humidity: 0
};

// ✅ ESP SENDS DATA HERE
app.post("/update", (req, res) => {
latestData = req.body;
res.send("Data received");
});

// ✅ WEBSITE FETCHES DATA HERE
app.get("/data", (req, res) => {
res.json(latestData);
});

// ✅ ALERT ROUTE (FIXED STRING ERROR)
app.post("/alert", async (req, res) => {
if (!client) {
return res.status(500).send("Twilio not configured");
}

```
const { gasHigh, tempHigh, humHigh, gas, temperature, humidity } = req.body;

let message = "Warning! ";

if (gasHigh) message += "Gas level is high. ";
if (tempHigh) message += "Temperature is high. ";
if (humHigh) message += "Humidity is high. ";

// ✅ FIXED (NO BACKTICK ERROR)
message += "Gas " + gas + ", Temperature " + temperature + ", Humidity " + humidity;

try {
    await client.calls.create({
        twiml: "<Response><Say voice='alice'>" + message + "</Say></Response>",
        to: "+918919306277",        // YOUR NUMBER
        from: "+17405548802"        // YOUR TWILIO NUMBER
    });

    res.send("Call triggered");
} catch (err) {
    console.log("CALL ERROR:", err);
    res.status(500).send("Error");
}
```

});

// ✅ RAILWAY PORT FIX
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
