import { useState } from 'react';
import './NoteComposer.css';
import pinlogo from '../assets/pin.svg'
import pinlogofill from '../assets/pin-fill.svg'
import imageicon from '../assets/imageicon.png'
import colorpallet from '../assets/colorpallet.png'

function NoteComposer({isPinned,setIsPinned,onCreate}) 
{
    const [isActive,setIsActive]=useState(false);
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [error,setError]=useState("");
    
    async function handleSubmit()
    {
        if (title.trim().length===0)
        {
            setError("Title Cannot be Empty!");
            return;
        }
        else if (title.trim().length>255)
        {
            setError("Title length cannot exceed 255 characters!");
            return;
        }
        else if (content.length>10000)
        {
            setError("Content length cannot exceed 10000 characters!");
            return;
        }
        try
        {
            setIsSubmitting(true);
            await onCreate({
                title:title.trim(),
                content:content,
                isPinned:isPinned
            });
            setTitle("");
            setContent("");
            setError("");
            setIsActive(false);
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
    function handleTitleOnChange(e)
    {
        setTitle(e.target.value);
        setError("");
    }
    function handleContentOnChange(e)
    {
        setContent(e.target.value);
        setError("");
    }
    function handleCloseButton()
    {
        setIsActive(false);
        setTitle("");
        setContent("");
        setError("");
        setIsSubmitting(false);
    }
    let displayContent=""
    if (isActive===false)
    {
        displayContent=<div className="NoteComposer-collapsed-container" onClick={()=>setIsActive(true)}>
            <span>Take a note...</span>
        </div>
    }
    else
    {
        displayContent=<div className="NoteComposer-expanded-container">
            <div className="NoteComposer-section-top">
                <input type="text" placeholder='Title' value={title} onChange={(e)=>handleTitleOnChange(e)}/>
                <button type="button" onClick={()=>setIsPinned(p=>p?false:true)}><img src={`${isPinned?pinlogofill:pinlogo}`} alt="pinlogo" /></button>
            </div>
            {error && <p className="NoteComposer-error">{error}</p>}
            <div className="NoteComposer-section-middle">
                <textarea placeholder='Take a note...' value={content} onChange={(e)=>handleContentOnChange(e)}/>
            </div>
            <div className="NoteComposer-section-bottom">
                <button type="button"><img src={colorpallet} alt="Colorpallet Icon" /></button>
                <button type="button"><img src={imageicon} alt="Image Icon" /></button>
                <button type="button">&#8630;</button>
                <button type="button">&#8631;</button>
                <button className="NoteComposer-close-create-button" onClick={handleCloseButton} type="button" disabled={isSubmitting}>Close</button>
                <button className="NoteComposer-close-create-button" onClick={handleSubmit} type="button" disabled={isSubmitting}>Create</button>
            </div>
            
        </div>
    }
    return (
        <div className="NoteComposer-container">
            {displayContent}
        </div>
    );
}

export default NoteComposer;