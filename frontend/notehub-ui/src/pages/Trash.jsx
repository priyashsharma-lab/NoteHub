import { useEffect, useState } from 'react';
import NoteGrid from '../components/NoteGrid';
import './Trash.css';
import {getDeletedNotes,deleteNoteForever,restoreNote,emptyTrash} from '../services/noteService.js';
import restoreicon from '../assets/restoreicon.jpg';
import deleteforevericon from '../assets/deleteforevericon.png';
function Trash()
{
    const [notes,setNotes]=useState([]);
    const [feedbackMessage,setFeedbackMessage]=useState("");
    const [selectedNote,setSelectedNote]=useState(null);
    const [noteToDelete,setNoteToDelete]=useState(null);
    const [isProcessing,setIsProcessing]=useState(false);
    const [isEmptyTrash,setIsEmptyTrash]=useState(false);
    useEffect(
        ()=>
        {
            async function fetchDeletedNotes()
            {
                try
                {
                    const response= await getDeletedNotes();
                    setNotes(response);
                }
                catch (error)
                {
                    setFeedbackMessage("Error:Cannot fetch deleted notes!"+(error.response?.data?.message||error.message));
                }
            }
            fetchDeletedNotes();
        },[]);

    function onNoteClick(note)
    {
        setSelectedNote(note);
    }
    function onDeleteForever(note)
    {
        setNoteToDelete(note);
    }

    async function deleteForever(e)
    {
        e.stopPropagation();
        try
        {
            setIsProcessing(true);
            await deleteNoteForever(noteToDelete.id);
            setNotes(n=>n.filter((note)=>note.id!==noteToDelete.id));
            setFeedbackMessage("Note Deleted Permanently");
            setNoteToDelete(null);
            setSelectedNote(null);
        }
        catch (error)
        {
            setFeedbackMessage("Error:Failed To Permanently Delete Note"+(error.response?.data?.message||error.message));
        }
        finally
        {
            setIsProcessing(false);
        }
    }
    function onCloseDelete(e)
    {
        e.stopPropagation();
        setNoteToDelete(null);
    }

    async function onRestore(e,note)
    {
        e.stopPropagation();
        try
        {
            setIsProcessing(true);
            await restoreNote(note.id);
            setNotes(n=>n.filter((nt)=>nt.id!==note.id));
            setFeedbackMessage("Note Restored Successfully");
            setSelectedNote(null);
        }
        catch(error)
        {
            setFeedbackMessage("Error:Failed To Restore Note"+(error.response?.data?.message||error.message));
        }
        finally
        {
            setIsProcessing(false);
        }
    }

    async function deleteTrashNotes(e)
    {
        e.stopPropagation();
        try
        {
            setIsProcessing(true);
            await emptyTrash();
            setNotes([]);
        }
        catch(error)
        {
            setFeedbackMessage("Error:Failed To Empty Trash Note"+(error.response?.data?.message||error.message));
        }
        finally
        {
            setIsProcessing(false);
            setIsEmptyTrash(false);
        }
    }

    useEffect(
        ()=>
        {
            if (feedbackMessage==="") return;
            const timeoutId=setTimeout(()=>
            {
                setFeedbackMessage("");
            },10000);
            return ()=>(clearTimeout(timeoutId));
        },[feedbackMessage]);

    const trashOnNoteClickDialogcontent=(
        <div className="Trash-backdrop-container" onClick={(e)=>{
            e.stopPropagation();
            setSelectedNote(null);
        }}>
            <div className="Trash-onNoteclickdialog-container" onClick={(e) => e.stopPropagation()}>
                <p>{selectedNote?.title}</p>
                <p>{selectedNote?.content}</p>
                <p className="Trash-updatedAt-container">Note in Trash - Edited:{new Date(selectedNote?.updatedAt).toLocaleString()}</p>
                <div className="Trash-bottomsection-container">
                    <button type="button" onClick={(e) => setNoteToDelete(selectedNote)} disabled={isProcessing}><img src={deleteforevericon} alt="deleteforever" /></button>
                    <button type="button" onClick={(e) => onRestore(e,selectedNote)} disabled={isProcessing}><img src={restoreicon} alt="restoreicon" /></button>
                    <button type="button" className="Trash-bottomsection-closebutton" onClick={(e)=>{
                        e.stopPropagation();
                        setSelectedNote(null);
                    }}>Close</button>
                </div>
            </div>
        </div>
    );

    const foreverDeleteDialogContent=(
        <div className="Trash-backdrop-container" onClick={(e)=>onCloseDelete(e)}>
            <div className="Trash-onNoteclickdialog-container" onClick={(e)=>e.stopPropagation()}>
                <p className="Trash-deletenoteforevermessage">Delete Note Forever!</p>
                <div className="Trash-bottomsection-container">
                    <button type="button" onClick={(e) => deleteForever(e)} disabled={isProcessing} className="Trash-bottomsection-deletebutton">Delete</button>
                    <button type="button" className="Trash-bottomsection-closebutton" onClick={onCloseDelete}>Cancel</button>
                </div>
            </div>
        </div>
    );

    const emptyTrashDialogContent=(
            <div className="Trash-backdrop-container" onClick={(e)=>{
                e.stopPropagation();
                setIsEmptyTrash(false);
            }}>
            <div className="Trash-onNoteclickdialog-container" onClick={(e)=>e.stopPropagation()}>
                <p className="Trash-deletenoteforevermessage">Empty trash? All notes in Trash will be permanently deleted.</p>
                <div className="Trash-bottomsection-container">
                    <button type="button" onClick={(e) => deleteTrashNotes(e)} disabled={isProcessing} className="Trash-bottomsection-deletebutton">Empty Trash</button>
                    <button type="button" className="Trash-bottomsection-closebutton" onClick={(e)=>{
                        e.stopPropagation();
                        setIsEmptyTrash(false);
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    );

    const noNotesinTrashContent=(
        <div className="Trash-nonotesintrash-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 24 24" fill="#d9d9d9">
                <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm0 5h2v9H9V8zm4 0h2v9h-2V8z"/>
            </svg>
            <p>No Notes in Trash</p>
        </div>
    );

    const feedBackMessageDialogContent=(
        <div className="Trash-feedbackMessage-container">
            <span className={feedbackMessage.startsWith("Error")?"Trash-feedbackmessage-span-error":"Trash-feedbackmessage-span"}>{feedbackMessage}</span>
            <button onClick={()=>setFeedbackMessage("")}>&#10005;</button>
        </div>
    );
    return(
        <div className="Trash-container">
            <div className="Trash-cleartrash-container">
                <span>Notes in Trash are deleted after 7 days.</span>
                <button className="Trash-emptytrash-button" onClick={(e)=>{
                    e.stopPropagation();
                    if (notes.length===0)
                    {
                        setFeedbackMessage("No Notes in Trash!");
                        return;
                    }
                    setIsEmptyTrash(true);
                }}>Empty Trash</button>
            </div>
            {notes.length===0?noNotesinTrashContent:<NoteGrid notes={notes} setFeedbackMessage={setFeedbackMessage} isTrash={true} onNoteClick={onNoteClick} onDeleteForever={onDeleteForever} onCloseDelete={onCloseDelete} onRestore={onRestore} isProcessing={isProcessing}/>}
            {selectedNote&&trashOnNoteClickDialogcontent}
            {noteToDelete&&foreverDeleteDialogContent}
            {isEmptyTrash&&emptyTrashDialogContent}
            {feedbackMessage&&feedBackMessageDialogContent}
        </div>
    );
}   

export default Trash