import React from 'react'


export default function Sidebar(){
return (
<aside className="w-64 min-w-[200px] bg-panel p-4 hidden md:block">
<button className="w-full mb-4 py-2 rounded-lg bg-slate-700/40 text-sm">+ New chat</button>
<nav className="space-y-2">
<div className="p-2 rounded bg-slate-800/40 text-sm">Example conversation 1</div>
<div className="p-2 rounded bg-transparent text-sm text-slate-400">Example conversation 2</div>
</nav>
</aside>
)
}