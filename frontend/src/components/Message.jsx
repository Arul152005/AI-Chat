import React from 'react'


export default function Message({role, children}){
const isUser = role==='user'
return (
<div className={`flex ${isUser? 'justify-end':'justify-start'} py-2`}>
<div className={`${isUser? 'bg-slate-600/40 text-white':'bg-slate-900/60 text-slate-100'} msg-bubble max-w-[80%]`}>
{children}
</div>
</div>
)
}