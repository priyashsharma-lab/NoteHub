import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './index.css';
import Home from './pages/Home.jsx';
import { Routes,Route,Navigate} from 'react-router-dom';
import Trash from './pages/Trash.jsx';
import Archive from './pages/Archive.jsx';
function App()
{
    const [isCollapsed,setIsCollapsed]=useState(false);
    function onMenuClick()
    {
        setIsCollapsed(i=>i?false:true);
    }
    return(
        <>
            <Navbar onMenuClick={onMenuClick}/>  
            <div className="main-layout">
                <Sidebar isCollapsed={isCollapsed}/>
                <Routes>
                    <Route path="/" element={<Navigate to="/notes" replace />} />
                    <Route path="/notes" element={<Home/>}/>
                    <Route path="/trash" element={<Trash/>}/>
                    <Route path="/archive" element={<Archive/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
