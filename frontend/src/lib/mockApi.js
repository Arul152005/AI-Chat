// lightweight mock API to simulate streaming responses
// export async function sendMessageToMockApi(userText, onUpdate){
//     // split reply into chunks
//     const reply = `This is a simulated response to: "${userText}"\n\nYou can replace mockApi with a real backend endpoint.\n\nFeatures supported: streaming text, markdown, code blocks.`
//     const words = reply.split(/(\s+)/)
//     for(let i=0;i<words.length;i++){
//     await new Promise(r=>setTimeout(r, 40 + Math.random()*80))
//     onUpdate(words[i])
//     }
//     return
//     }

    export async function sendMessageToApi(userText, onUpdate){
  const response = await fetch("http://localhost:4000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userText })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const text = decoder.decode(value);
    
    text.split("data: ").forEach(line => {
      if (line && !line.includes("[END]")) {
        onUpdate(line);
      }
    });
  }
  return
}
