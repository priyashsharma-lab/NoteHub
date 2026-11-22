import './Navbar.css';
import noteHubLogo from '../assets/NoteHub logo.png';
import { useNavigate } from 'react-router-dom';

function Navbar({ onMenuClick ,searchInput,setSearchInput,setRefreshTrigger}) {
    const navigate=useNavigate();
    return (
        <div id="navbar-container">
            <div id="hamburger-icon">
                <button
                    id="hamburger-icon-button"
                    type="button"
                    aria-label="Toggle navigation menu"
                    onClick={onMenuClick}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </button>
            </div>

            <div id="NoteHub-logo">
                <img src={noteHubLogo} alt="NoteHub logo" width={125} height={40} />
            </div>

            <div id="nav-search-bar" onClick={()=>navigate("/search")}>
                <button id="nav-search-button" type="button" aria-label="Search" onClick={(e)=>{
                    e.stopPropagation();
                    navigate("/search");
                    setRefreshTrigger(r=>r+1);
                }}>
                    <span>&#128269;</span>
                </button>
                <input type="text" placeholder="Search" aria-label="Search notes" onChange={(e)=>setSearchInput(e.target.value)} value={searchInput}/>
                <button id="nav-clear-button" type="button" aria-label="Clear search" onClick={(e)=>{
                    e.stopPropagation();
                    setSearchInput("");
                    navigate("/notes");
                    }}>
                    <span>&#10005;</span>
                </button>
            </div>

            <div id="nav-utility-icons">
                <button id="nav-refresh-icon" type="button" aria-label="Refresh notes">
                    &#8635;
                </button>
                <button id="nav-settings-icon" type="button" aria-label="Settings">
                    &#9881;
                </button>
                {/* later add view and account logo */}
            </div>
        </div>
    );
}

export default Navbar;