# ChatGPT-style Frontend (React + Tailwind)


This project is a starting point for a ChatGPT-like frontend. It uses a mock API that streams text chunks to simulate real assistant responses. Replace `src/lib/mockApi.js` with your real backend requests (websocket or server-sent events) to connect to an actual LLM.


Features to add next:
- WebSocket streaming for real-time tokens
- Markdown rendering with syntax highlighting
- Conversation persistence (localStorage or backend)
- Authentication




---




End of files. Save each section to the matching file path and run `npm install` then `npm run dev`.




/* Notes: */
// - This is intentionally simple and focused on UI structure.
// - Tailwind + Vite combo keeps the setup minimal.
// - You can swap Tailwind for CSS modules or styled-components if preferred.