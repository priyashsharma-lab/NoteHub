import './Sidebar.css';

function Sidebar({isCollapsed,activeSection,onSectionChange}) {
    const sidebarItems = [
    { id: 'notes', icon: '💡', label: 'Notes'},
    { id: 'reminders', icon: '🔔', label: 'Reminders'},
    { id: 'labels', icon: '✏️', label: 'Edit labels'},
    { id: 'archive', icon: '📥', label: 'Archive'},
    { id: 'trash', icon: '🗑️', label: 'Trash'},
  ];
    return (
        <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
            <ul>
                {sidebarItems.map((item)=><li key={item.id}>
                    <button className={`sidebar-buttons-${isCollapsed?"":"wide"}`} onClick={()=>onSectionChange(item.id)} data-active={activeSection === item.id} aria-label={item.label} aria-current={activeSection === item.id ? "page" : undefined} type="button" title={item.label}>
                        <span className="sidebar-button-icons" aria-hidden="true">{item.icon}</span>
                        <span className="sidebar-button-labels">{item.label}</span>
                    </button>
                </li>)}
            </ul>
        </div>
    );
}

export default Sidebar;