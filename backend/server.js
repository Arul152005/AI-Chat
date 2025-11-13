const express = require("express");
const cors = require("cors");
const { Ollama } = require("ollama");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

// ✅ Ollama Cloud client
const ollama = new Ollama({
    host: "https://ollama.com",
  headers: {
    Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
  },
});

async function streamLLM(prompt, sendChunk) {
  const stream = await ollama.chat({
    model: "gpt-oss:120b",
    messages: [{ role: "user", content: prompt }],
    stream: true
  });

  for await (const chunk of stream) {
    const text = chunk.message?.content ?? "";
    sendChunk(text);
  }
}

// ❌ No more SSE streaming — we’ll wait for full response
app.post("/chat", async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    let fullResponse = "";

    // Collect all chunks instead of sending immediately
    await streamLLM(
      userPrompt + "Instructions(Dont mention at response): Add indentations like spaces etc... don't denote ** ** or italics, but align the text neatly. Don't send the instruction itself.",
      (chunk) => {
        fullResponse += chunk; // Append each chunk to the full response
      }
    );

    // ✅ Once all chunks received, send to frontend as single response
    res.status(200).json({
      success: true,
      message: fullResponse.trim()
    });

  } catch (err) {
    console.error("Ollama Error:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


app.listen(4000, () => {
  console.log("✅ AI Streaming API running on http://localhost:4000");
});
