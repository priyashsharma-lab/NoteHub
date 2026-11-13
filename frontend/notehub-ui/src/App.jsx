import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NoteComposer from './components/NoteComposer';
import {createNote} from './services/noteService.js';
import './index.css';
function App()
{
    const [isCollapsed,setIsCollapsed]=useState(false);
    const [activeSection,setActiveSection]=useState("notes");
    const [isPinned,setIsPinned]=useState();
    function onSectionChange(selectedSection)
    {
        setActiveSection(selectedSection);
    }
    function onMenuClick()
    {
        setIsCollapsed(i=>i?false:true);
    }
    async function onCreate(data)
    {
        const noteData={title:data.title,content:data.content};
        const response=await createNote(noteData);
        return response;
    }
    return(
        <>
            <Navbar onMenuClick={onMenuClick}/>  
            <div className="main-layout">
                <Sidebar isCollapsed={isCollapsed} activeSection={activeSection} onSectionChange={onSectionChange}/>
                <main className="content-area">
                    <NoteComposer isPinned={isPinned} setIsPinned={setIsPinned} onCreate={onCreate}/>
                </main>
            </div>
        </>
    )
}

export default App
