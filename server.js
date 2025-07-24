const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "❌ لا يوجد رد.";
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "❌ خطأ في الاتصال بـ OpenAI" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔌 السيرفر شغال على http://localhost:${PORT}`);
});
