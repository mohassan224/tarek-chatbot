export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "عذرًا، حصل خطأ في الاتصال بالذكاء الاصطناعي.";

  res.status(200).json({ reply });
}
