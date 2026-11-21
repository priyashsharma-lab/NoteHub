import './NoteCard.css';
import pinlogo from '../assets/pin.svg';
import pinlogofill from '../assets/pin-fill.svg';
import imageicon from '../assets/imageicon.svg';
import colorpallet from '../assets/colorpallet.svg';
import archiveicon from '../assets/archiveicon.svg';
import restoreicon from '../assets/restoreicon.svg';
import deleteforevericon from '../assets/deleteforevericon.svg';
import { useEffect, useRef, useState } from 'react';
import ColorPalette from './ColorPalette';
import { getNoteColorHex } from '../constants/NoteColors';
function NoteCard({note,onNoteClick,onDelete,setFeedbackMessage,isTrash,onDeleteForever,onRestore,isProcessing,handleArchiveNote,setIsProcessing,handleUnarchiveNote,handlePinNote,handleUnpinNote,handleChangeNoteBackground,onCopy})
{
    const [isMoreMenuActive,setIsMoreMenuActive]=useState(false);
    const notecardSectionBottomRef=useRef(null);
    const [isColorPaletteActive,setIsColorPaletteActive]=useState(false);
    useEffect(
        ()=>
        {

            function handleOutsideClick(event)
            {
                if (notecardSectionBottomRef.current&&!notecardSectionBottomRef.current.contains(event.target))
                {
                    isMoreMenuActive?setIsMoreMenuActive(false):undefined;
                    isColorPaletteActive?setIsColorPaletteActive(false):undefined;
                }
            }

            window.addEventListener("mousedown",handleOutsideClick,true);
            return ()=>{window.removeEventListener("mousedown",handleOutsideClick,true)};
        },[isMoreMenuActive,isColorPaletteActive]);

    function handleMoreButtonOnClick(e)
    {
        e.stopPropagation();
        setIsMoreMenuActive(i=>i?false:true);
    }

    async function handleDeleteButtonOnClick(e)
    {
        e.stopPropagation();
        try
        {
            setIsProcessing(true);
            await onDelete(note);
            setFeedbackMessage("Note Deleted Successfully");
        }
        catch(error)
        {
            console.log("Error:Deletion Failed! "+(error.response?.data?.message || error.message));
            setFeedbackMessage("Error:Deletion Failed! "+(error.response?.data?.message || error.message || ""));
        }
        finally
        {
            setIsProcessing(false);
        }
    }

    async function handleOnCopy()
    {
        try
        {
            const response=await onCopy(note);
            setFeedbackMessage("Note Copied Successfully");
            setIsMoreMenuActive(false);
        }
        catch(error)
        {
            console.log("Error:Copy Failed! "+(error.response?.data?.message || error.message));
            setFeedbackMessage("Error:Copy Failed! "+(error.response?.data?.message || error.message || ""));
        }
    }


    const moreMenuContent=(
        <div className="NoteCard-moremenu-container">
            <button onClick={(e)=>{
                e.stopPropagation();
                handleOnCopy();
            }} type="button" disabled={isProcessing}>Make a copy</button>
            <button onClick={(e)=>handleDeleteButtonOnClick(e)} disabled={isProcessing}>Delete</button>
        </div>
    );

    const trashPageBottomSectionContent=(
        <>
        <button type="button" onClick={(e) =>
        {
            e.stopPropagation(); 
            onDeleteForever(note);
        }} disabled={isProcessing}>
            <img src={deleteforevericon} alt="deleteforever" /></button>
        <button type="button" onClick={(e) =>
        {
            onRestore(e,note);
        }} disabled={isProcessing}>
            <img src={restoreicon} alt="restoreicon" /></button>
        </>
        
    );
    const homePageBottomSectionContent=(
            <>
            <button type="button" onClick={(e) => {
                e.stopPropagation();
                isColorPaletteActive?setIsColorPaletteActive(false):setIsColorPaletteActive(true);
            }} disabled={isProcessing}><img src={colorpallet} alt="Colorpallet Icon" /></button>
            <button type="button" onClick={(e) => e.stopPropagation()}><img src={imageicon} alt="Image Icon" /></button>
            <button type="button" onClick={async (e)=>{
                e.stopPropagation();
                !note.archived?await handleArchiveNote(note):await handleUnarchiveNote(note);
            }} disabled={isProcessing}><img src={archiveicon} alt="archiveicon" /></button>
            <button type="button" onClick={(e) => handleMoreButtonOnClick(e)}><span>&#8942;</span></button>                {isMoreMenuActive?moreMenuContent:null}
            {isColorPaletteActive?<ColorPalette noteBackgroundColor={note.backgroundColor} isProcessing={isProcessing} note={note} setFeedbackMessage={setFeedbackMessage} setIsProcessing={setIsProcessing} handleChangeNoteBackground={handleChangeNoteBackground}/>:null}
            {/* Add more later */}
            </>
    );
    return(
        <div className="NoteCard-container" onClick={()=>onNoteClick(note)} style={{ backgroundColor: getNoteColorHex(note.backgroundColor) }}>
            <div className="NoteCard-section-top">
                <span>{note.title}</span>
                {
                    isTrash?undefined:
                    <>
                        <button
                        className={`NoteCard-pin-button ${note.pinned ? 'is-pinned' : ''}`}
                        type="button"
                        aria-label={note.pinned ? "Unpin note" : "Pin note"}
                        title={note.pinned ? "Unpin note" : "Pin note"}
                        onClick={async (e) =>{
                            e.stopPropagation();
                            note.pinned?await handleUnpinNote(note):await handlePinNote(note);
                        }} disabled={isProcessing}>
                            <img src={note.pinned ? pinlogofill : pinlogo} alt="Pin icon" />
                        </button>
                    </>
                }
            </div>
            <div className="NoteCard-section-middle">
                {note.content && note.content.trim() ? 
                ( <p>{note.content}</p>) : 
                ( <p className="NoteCard-empty-text">Empty note</p>)}
            </div>
            <div className="NoteCard-section-bottom" ref={notecardSectionBottomRef}>
                {
                    isTrash?trashPageBottomSectionContent:homePageBottomSectionContent
                }
            </div>
        </div>
    );
}

export default NoteCard