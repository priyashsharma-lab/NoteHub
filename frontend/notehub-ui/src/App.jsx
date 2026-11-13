import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './index.css';
import Home from './pages/Home.jsx';
function App()
{
    const [isCollapsed,setIsCollapsed]=useState(false);
    const [activeSection,setActiveSection]=useState("notes");
    function onSectionChange(selectedSection)
    {
        setActiveSection(selectedSection);
    }
    function onMenuClick()
    {
        setIsCollapsed(i=>i?false:true);
    }
    return(
        <>
            <Navbar onMenuClick={onMenuClick}/>  
            <div className="main-layout">
                <Sidebar isCollapsed={isCollapsed} activeSection={activeSection} onSectionChange={onSectionChange}/>
                <Home/>
            </div>
        </>
    )
}

export default App
