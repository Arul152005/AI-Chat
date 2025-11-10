const express = require("express");
const { Ollama } = require("ollama");


const app = express();
app.use(express.json());

// Initialize Ollama client
const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: "Bearer " + "d0b7c7199db34aad97a5cc6c16088df8.yQxapFN3IPvMswbNYryJ6UIk" ,
  },
});

// Function to get response from Ollama
async function getResponse(prompt) {
  const stream = await ollama.chat({
    model: "gpt-oss:120b",
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });

  let final = "";
  for await (const chunk of stream) {
    final += chunk.message?.content ?? "";
  }
  
  return final;
}


// Express route
app.post("/api/chat-ai", async (req, res) => {
  try {
    const userPrompt = req.body.prompt || "Hello!";
    
    const responseText = await getResponse(userPrompt);
    res.send(responseText);

  } catch (err) {
    console.error("Ollama error:", err);
    res.status(500).send("Error: " + err.message);
  }
});


// Start server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
