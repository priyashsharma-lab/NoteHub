import './NoteEditor.css';
import pinlogo from '../assets/pin.svg'
import pinlogofill from '../assets/pin-fill.svg'
import imageicon from '../assets/imageicon.svg'
import colorpallet from '../assets/colorpallet.svg'
import archiveicon from '../assets/archiveicon.svg'
import { useState } from 'react';
import ColorPalette from './ColorPalette.jsx';
import { getNoteColorHex } from '../constants/NoteColors';
function NoteEditor({note,onSaveUpdate,onCloseUpdate,handleArchiveNote,isProcessing,handleUnarchiveNote,handlePinNote,handleUnpinNote,setIsProcessing,setFeedbackMessage,handleChangeNoteBackground})
{
    const [selectedNote,setSelectedNote]=useState({...note,content:(note.content===null?"":note.content),backgroundColor:note.backgroundColor});
    const [error,setError]=useState("");
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [isColorPaletteActive,setIsColorPaletteActive]=useState(false);
    const bgHex = getNoteColorHex(note.backgroundColor);
    async function handleSaveUpdate()
    {
        if (selectedNote.title.trim().length===0)
        {
            setError("Title Cannot be Empty!");
            return;
        }
        else if (selectedNote.title.trim().length>255)
        {
            setError("Title length cannot exceed 255 characters!");
            return;
        }
        else if (selectedNote.content.length>10000)
        {
            setError("Content length cannot exceed 10000 characters!");
            return;
        }
        try
        {
            setIsSubmitting(true);
            const cleanedNote = {
            ...selectedNote,
            title:selectedNote.title.trim(),
            backgroundColor:note.backgroundColor
        };
            await onSaveUpdate(cleanedNote);
            setError("");
            onCloseUpdate();
        }
        catch (errors)
        {
            setError(errors.response?.data?.message || errors?.message || "Something went wrong");
        }
        finally
        {
            setIsSubmitting(false);
        }
    }
    function handleTitleChange(e)
    {
        setSelectedNote(s=>({...s,title:e.target.value}));
        setError("");
    }
    function handleContentChange(e)
    {
        setSelectedNote(s=>({...s,content:e.target.value}));
        setError("");
    }
    return(
        <div className="NoteEditor-backdrop-container" onClick={isSubmitting?undefined:onCloseUpdate}>            
            <div className="NoteEditor-container" onClick={(e)=>e.stopPropagation()} style={{ backgroundColor: bgHex }}>
                <div className="NoteEditor-section-top">
                    <input type="text" value={selectedNote.title} onChange={(e)=>{handleTitleChange(e)}} placeholder="Title" style={{ backgroundColor: bgHex }}/>
                    <button
                    className={`NoteEditor-pin-button ${note.pinned ? 'is-pinned' : ''}`}
                    type="button"
                    aria-label={note.pinned ? "Unpin note" : "Pin note"}
                    title={note.pinned ? "Unpin note" : "Pin note"}
                    onClick={async (e) =>{
                        e.stopPropagation();
                        note.pinned?await handleUnpinNote(note):await handlePinNote(note);
                    }} disabled={isProcessing}><img src={note.pinned ? pinlogofill : pinlogo} alt="Pin icon" /></button>
                </div>
                {error && <p className="NoteComposer-error">{error}</p>}
                <div className="NoteEditor-section-middle">
                    <textarea value={selectedNote.content} onChange={(e)=>{handleContentChange(e)}} placeholder="Take a note..." style={{ backgroundColor: bgHex }}></textarea>
                </div>
                <span className="NoteEditor-updatedat-container"> Edited {selectedNote.updatedAt?(new Date(selectedNote.updatedAt).toLocaleString()):""}</span>
                <div className="NoteEditor-section-bottom">
                    <button type="button" onClick={(e) => {
                    e.stopPropagation();
                    isColorPaletteActive?setIsColorPaletteActive(false):setIsColorPaletteActive(true);
                }} disabled={isProcessing}><img src={colorpallet} alt="Colorpallet Icon" /></button>
                    <button type="button" onClick={(e) => e.stopPropagation()}><img src={imageicon} alt="Image Icon" /></button>
                    <button type="button" onClick={async (e)=>{
                        e.stopPropagation();
                        {!note.archived?await handleArchiveNote(note):await handleUnarchiveNote(note)}
                    }} disabled={isProcessing}><img src={archiveicon} alt="archiveicon" /></button>
                    <button className="NoteEditor-close-create-button" type="button" disabled={isSubmitting||isProcessing} onClick={onCloseUpdate}>Close</button>
                    <button className="NoteEditor-close-create-button" type="button" onClick={handleSaveUpdate} disabled={isSubmitting||isProcessing}>Update</button>
                    
                    {isColorPaletteActive?<ColorPalette noteBackgroundColor={note.backgroundColor} isProcessing={isProcessing} note={note} setFeedbackMessage={setFeedbackMessage} setIsProcessing={setIsProcessing} handleChangeNoteBackground={handleChangeNoteBackground}/>:null}
                    {/* Add more later */}
                </div>
            </div>
        </div>
    );
}

export default NoteEditor