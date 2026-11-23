import React, { useState,useRef,useCallback } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './index.css';
import Home from './pages/Home.jsx';
import { Routes,Route,Navigate} from 'react-router-dom';
import Trash from './pages/Trash.jsx';
import Archive from './pages/Archive.jsx';
import Search from './pages/Search.jsx';
function App()
{
    const [isCollapsed,setIsCollapsed]=useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [refreshTrigger,setRefreshTrigger]=useState(0);
    const [isRefreshing,setIsRefreshing]=useState(false);
    const activeRefreshCountRef = useRef(0);

    const startRefreshing = useCallback(() => {
        activeRefreshCountRef.current += 1;
        setIsRefreshing(true);
    }, []);

    const endRefreshing = useCallback(() => {
        activeRefreshCountRef.current = Math.max(0, activeRefreshCountRef.current - 1);
        if (activeRefreshCountRef.current === 0) {
            setIsRefreshing(false);
        }
    }, []);

    function onMenuClick()
    {
        setIsCollapsed(i=>i?false:true);
    }
    return(
        <>
            <Navbar onMenuClick={onMenuClick} searchInput={searchInput} setSearchInput={setSearchInput} setRefreshTrigger={setRefreshTrigger} isRefreshing={isRefreshing}/>  
            <div className="main-layout">
                <Sidebar isCollapsed={isCollapsed}/>
                <Routes>
                    <Route path="/" element={<Navigate to="/notes" replace />} />
                    <Route path="/notes" element={<Home refreshTrigger={refreshTrigger} startRefreshing={startRefreshing} endRefreshing={endRefreshing} isRefreshing={isRefreshing}/>}/>
                    <Route path="/trash" element={<Trash refreshTrigger={refreshTrigger} startRefreshing={startRefreshing} endRefreshing={endRefreshing} isRefreshing={isRefreshing}/>}/>
                    <Route path="/archive" element={<Archive refreshTrigger={refreshTrigger} startRefreshing={startRefreshing} endRefreshing={endRefreshing} isRefreshing={isRefreshing}/>}/>
                    <Route path="/search" element={<Search searchInput={searchInput} refreshTrigger={refreshTrigger} startRefreshing={startRefreshing} endRefreshing={endRefreshing} isRefreshing={isRefreshing}/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App