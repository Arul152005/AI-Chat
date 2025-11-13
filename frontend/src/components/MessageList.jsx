import React, { useRef, useEffect } from "react";
import Message from "./Message";

export default function MessageList({ messages }) {
  const endRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="p-4 overflow-auto h-full bg-slate-950 text-slate-100"
      role="log"
      aria-live="polite"
    >
      {messages.map((m, idx) => (
        <Message key={idx} role={m.role}>
          {/* 🧩 Preserve newlines and indentation */}
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "monospace",
              background: m.role === "user" ? "transparent" : "#1e1e1e",
              padding: "0.5rem",
              borderRadius: "0.5rem",
            }}
          >
            {m.content}
          </pre>
        </Message>
      ))}

      {/* Auto-scroll target */}
      <div ref={endRef} />
    </div>
  );
}
    