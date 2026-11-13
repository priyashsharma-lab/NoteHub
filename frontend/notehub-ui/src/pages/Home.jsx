import React, { useEffect, useState } from 'react';
import NoteComposer from '../components/NoteComposer.jsx';
import {createNote,getAllNotes} from '../services/noteService.js';
import NoteGrid from '../components/NoteGrid.jsx';
import './Home.css';
function Home()
{
    const [isPinned,setIsPinned]=useState();
    const [notes,setNotes]=useState([]);
    function onNoteClick(note)
    {

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
    return(
        <>
            <main className="content-area">
                <NoteComposer isPinned={isPinned} setIsPinned={setIsPinned} onCreate={onCreate}/>
                <NoteGrid notes={notes} onNoteClick={onNoteClick}/>
            </main>
        </>
    )
}

export default Home
