const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

const accountSid = "YOUR_TWILIO_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";

const client = twilio(accountSid, authToken);

// ALERT ROUTE
app.post("/alert", async (req, res) => {
const { gasHigh, tempHigh, humHigh, gas, temperature, humidity } = req.body;

```
let message = "Warning! ";

if (gasHigh) message += "Gas level is high. ";
if (tempHigh) message += "Temperature is high. ";
if (humHigh) message += "Humidity is high. ";

message += `Values are Gas ${gas}, Temp ${temperature}, Humidity ${humidity}`;

try {
    await client.calls.create({
        twiml: `<Response><Say voice="alice">${message}</Say></Response>`,
        to: "+918919306277",
        from: "YOUR_TWILIO_NUMBER"
    });

    res.send("Call triggered");
} catch (err) {
    console.log(err);
    res.status(500).send("Error");
}
```

});

app.listen(3000, () => console.log("Server running"));
