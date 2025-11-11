import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'


export default function App(){
return (
<div className="h-screen flex flex-col">
<Header />
<div className="flex flex-1 overflow-hidden">
{/* <Sidebar /> */}
<main className="flex-1 flex flex-col">
<ChatWindow />
</main>
</div>
</div>
)
}