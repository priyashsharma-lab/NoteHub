import React, { useEffect, useState } from 'react';
import NoteComposer from '../components/NoteComposer.jsx';
import {createNote,getAllNotes,updateNote,trashNote} from '../services/noteService.js';
import NoteGrid from '../components/NoteGrid.jsx';
import './Home.css';
import NoteEditor from '../components/NoteEditor.jsx';
function Home()
{
    const [isPinned,setIsPinned]=useState(false);
    const [notes,setNotes]=useState([]);
    const [selectedNote,setSelectedNote]=useState(null);
    const [feedbackMessage,setFeedbackMessage]=useState("");
    function onNoteClick(note)
    {
        setSelectedNote(note);
    }

    async function onSaveUpdate(note)
    {
        const request={title:note.title,content:note.content};
        const response=await updateNote(note.id,request);
        setNotes(n=>[response,...n.filter((note)=>note.id!==response.id)]);
        return response;
    }

    function onCloseUpdate()
    {
        setSelectedNote(null);
    }

    async function onCreate(data)
    {
        const noteData={title:data.title,content:data.content};
        const response=await createNote(noteData);
        setNotes(n=>[...n,response]);
        return response;
    }
    useEffect(()=>{const loadNotes=async ()=>
        {
            try
            {
                setNotes(await getAllNotes());
            }
            catch (error)
            {
                console.log("Fetching Notes Failed"+(error.response?.data?.message||error.message));
            }
        }
        loadNotes();
        },[]);

    async function onDelete(note)
    {
        const response=await trashNote(note.id);
        setNotes(n=>n.filter((nt)=>nt.id!==note.id));
        return response;
    }
    const feedbackMessageContent=(
        <div className="Home-feedbackMessage-container">
            <span className={feedbackMessage.startsWith("Error")?"Home-feedbackmessage-span-error":"Home-feedbackmessage-span"}>{feedbackMessage}</span>
            <button onClick={()=>setFeedbackMessage("")}>&#10005;</button>
        </div>
    );
    useEffect(
        ()=>
        {
            if (feedbackMessage==="") return;
            const timeoutId=setTimeout(()=>{
                setFeedbackMessage("");
            },10000);
            return ()=>clearTimeout(timeoutId);
        },[feedbackMessage]);

    return(
        <>
            <main className="content-area">
                <NoteComposer isPinned={isPinned} setIsPinned={setIsPinned} onCreate={onCreate}/>
                <NoteGrid notes={notes} onNoteClick={onNoteClick} onDelete={onDelete} setFeedbackMessage={setFeedbackMessage}/>
                {selectedNote&&<NoteEditor note={selectedNote} onSaveUpdate={onSaveUpdate} onCloseUpdate={onCloseUpdate}/>}
                {feedbackMessage&&feedbackMessageContent}
            </main>
        </>
    )
}

export default Home
