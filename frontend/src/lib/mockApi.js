export async function sendMessageToApi(userText, onUpdate) {
  try {
    const response = await fetch("http://localhost:4000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userText }),
    });

    // ❌ if server failed
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // ✅ Parse JSON body
    const data = await response.json();

    // ✅ Check for valid message
    if (data.success && data.message) {
      // Preserve line breaks and indentation
      const formattedMessage = data.message.replace(/\r?\n/g, "\n");
      onUpdate(formattedMessage);
    } else {
      onUpdate("⚠️ No valid response from server.");
    }

  } catch (error) {
    console.error("Error fetching from API:", error);
    onUpdate("❌ Network or server error occurred.");
  }
}
