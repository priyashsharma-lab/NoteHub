import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
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
            <Sidebar isCollapsed={isCollapsed} activeSection={activeSection} onSectionChange={onSectionChange}/>
        </>
    )
}

export default App
