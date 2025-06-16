import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());

// ✅ Replace with your Make.com webhook URL
const MAKE_WEBHOOK_URL = "https://webhook.site/9ecfe2a5-6f04-4c04-a9ad-64c4603d6e18";

// ✅ POST handler: receives JSON and relays to Make.com
app.post("/", async (req, res) => {
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();
    res.status(200).send({ status: "✅ Forwarded to Make.com", result: data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "❌ Failed to forward", error: err.message });
  }
});

// ✅ Use Replit's provided PORT or fallback to 3000 for local use
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`✅ Relay server running on port ${port}`);
});
