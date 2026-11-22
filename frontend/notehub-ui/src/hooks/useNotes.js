import { useEffect, useState } from 'react';
import { createNote, updateNote, trashNote , changeNoteBackground, copyNote } from '../services/noteService.js';

export function useNotes(fetchNotesFn,refreshTrigger,searchPageActive=false)
{
    const [notes,setNotes]=useState([]);
    const [selectedNote,setSelectedNote]=useState(null);
    const [feedbackMessage,setFeedbackMessage]=useState("");
    const [isProcessing,setIsProcessing]=useState(false);

    function onNoteClick(note)
    {
        setSelectedNote(note);
    }

    async function onSaveUpdate(note)
    {
        try
        {
            setIsProcessing(true);
            const request={title:note.title,content:note.content,backgroundColor:note.backgroundColor};
            const response=await updateNote(note.id,request);
            setNotes(n=>[response,...n.filter((note)=>note.id!==response.id)]);
            return response;
        }
        finally
        {
            setIsProcessing(false);
        }
    }

    function onCloseUpdate()
    {
        setSelectedNote(null);
    }

    async function onCreate(data)
    {
        try
        {
            setIsProcessing(true);
            const noteData={title:data.title,content:data.content,pinned:data.pinned,backgroundColor:(data.backgroundColor===null?"WHITE":data.backgroundColor)};
            const response=await createNote(noteData);
            setNotes(n=>[response,...n]);
            return response;
        }
        finally
        {
            setIsProcessing(false);
        }
    }

    useEffect(()=>
    {
        const loadNotes=async ()=>
        {
            try
            {
                setNotes(await fetchNotesFn());
            }
            catch (error)
            {
                console.log("Fetching Notes Failed"+(error.response?.data?.message||error.message));
            }
        }
        loadNotes();
    },[fetchNotesFn,refreshTrigger]);

    async function onDelete(note)
    {
        try
        {
            setIsProcessing(true);
            const response=await trashNote(note.id);
            setNotes(n=>n.filter((nt)=>nt.id!==note.id));
            return response;
        }
        finally
        {
            setIsProcessing(false);
        }
    }

    async function handleChangeNoteBackground(id, bgColor) 
    {
        try 
        {
            setIsProcessing(true);
            const response = await changeNoteBackground(id, bgColor);
            setNotes(n => n.map(nt => (nt.id === response.id ? response : nt)));
            setSelectedNote(s => (s && s.id === response.id ? response : s));
            return response;
        } finally 
        {
            setIsProcessing(false);
        }
    }

    async function onCopy(note) 
    {
        try 
        {
            setIsProcessing(true);
            const response = await copyNote({title:note.title,pinned:false,content:note.content,backgroundColor:note.backgroundColor});
            if (note.archived===false || searchPageActive===true)
            {
                setNotes(n => [response,...n]);
            }
            return response;
        } finally 
        {
            setIsProcessing(false);
        }
    }


    useEffect(
        ()=>
        {
            if (feedbackMessage==="") return;
            const timeoutId=setTimeout(()=>{
                setFeedbackMessage("");
            },10000);
            return ()=>clearTimeout(timeoutId);
        },[feedbackMessage]);

    const gridProps={notes,onNoteClick,onDelete,setFeedbackMessage,isProcessing,setIsProcessing};

    return {notes,setNotes,selectedNote,feedbackMessage,setFeedbackMessage,onCreate,onSaveUpdate,onCloseUpdate,isProcessing,setIsProcessing,gridProps,setSelectedNote,handleChangeNoteBackground,onCopy};
}
