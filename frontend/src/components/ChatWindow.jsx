import React, { useState } from 'react'
import MessageList from './MessageList'
import Composer from './Composer'
import { sendMessageToApi } from '../lib/mockApi'

export default function ChatWindow() {
  const [messages, setMessages] = useState([{}])
  const [isStreaming, setIsStreaming] = useState(false)

  async function handleSend(text) {
    setMessages(m => [...m, { role: 'user', content: text }])
    setMessages(m => [...m, { role: 'assistant', content: '' }])
    setIsStreaming(true)

    let buffer = ''
    await sendMessageToApi(text, chunk => {
      buffer += chunk
      setMessages(m => {
        const copy = [...m]
        copy[copy.length - 1] = { role: 'assistant', content: buffer }
        return copy
      })
    })

    setIsStreaming(false)
  }

  const isInitial = messages.length === 1 

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#071622] to-transparent relative">
      {/* Chat area */}
      <div className="flex-1 relative overflow-auto">
        {isInitial ? (
          // Centered message overlay
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-xl text-slate-300 italic select-none">
              Hello Guys
            </div>
          </div>
        ) : null}

        <MessageList messages={messages} />
      </div>

      {/* Composer stays active */}
      <Composer onSend={handleSend} disabled={isStreaming} />
    </div>
  )
}
