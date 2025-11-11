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

// ✅ Streaming route (SSE)
app.post("/chat", async (req, res) => {
  const userPrompt = req.body.prompt;
  
  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    await streamLLM(userPrompt+"Instructions(Dont mention at response):Add indendations like spaces etc... dont denote ** ** and other stuffs like italic etc.. but give the answer as neet alignment and indentations, Dont send the instruction answer to response", (chunk) => {
      res.write(`data: ${chunk}\n\n`);
    });

    res.write("data: [END]\n\n");
    res.end();

  } catch (err) {
    console.error("Ollama Error:", err);
    res.write(`data: ERROR: ${err.message}\n\n`);
    res.end();
  }
});

app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;  // 👈 get prompt from frontend POST body
    
    const responseText = await getResponse(prompt+"Give the response as html");
    res.json({ response: responseText });
  } catch (err) {
    console.error("Ollama error:", err);
    res.status(500).send("Error: " + err.message);
  }
});


app.listen(4000, () => {
  console.log("✅ AI Streaming API running on http://localhost:4000");
});
