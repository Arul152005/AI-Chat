import React, {useState} from 'react'


export default function Composer({onSend, disabled}){
const [text, setText] = useState('')
function submit(){
if(!text.trim())return
onSend(text.trim())
setText('')
}
return (
<div className="composer p-3 border-t border-slate-800 flex gap-3 items-end">
<textarea
value={text}
onChange={(e)=>setText(e.target.value)}
rows={1}
placeholder="Type your message..."
className="flex-1 resize-none rounded-md bg-slate-900/40 p-3 text-sm focus:outline-none"
onKeyDown={(e)=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); submit(); } }}
/>
<div className="flex items-center gap-2">
<button onClick={submit} disabled={disabled} className="px-4 py-2 rounded bg-accent text-black font-semibold disabled:opacity-50">Send</button>
</div>
</div>
)
}