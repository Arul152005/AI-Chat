import React, {useRef, useEffect} from 'react'
import Message from './Message'


export default function MessageList({messages}){
const endRef = useRef(null)
useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}) },[messages])


return (
<div className="p-4 overflow-auto h-full" role="log" aria-live="polite">
{messages.map((m,idx)=> (
<Message key={idx} role={m.role}>{m.content}</Message>
))}
<div ref={endRef} />
</div>
)
}