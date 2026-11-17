import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isCollapsed}) {
  const sidebarItems = [
    { id: 'notes', icon: '💡', label: 'Notes', path: '/notes' },
    { id: 'reminders', icon: '🔔', label: 'Reminders', path: '/reminders' },
    { id: 'edit-labels', icon: '✏️', label: 'Edit labels', isButton: true }, // Added right after Reminders
    { id: 'archive', icon: '📥', label: 'Archive', path: '/archive' },
    { id: 'trash', icon: '🗑️', label: 'Trash', path: '/trash' },
  ];

  const buttonClass = `sidebar-buttons-${isCollapsed ? "" : "wide"}`;

  return (
    <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.id}>
            {item.isButton ? (
              <button
                type="button"
                className={buttonClass}
                title={item.label}
              >
                <span className="sidebar-button-icons" aria-hidden="true">{item.icon}</span>
                <span className="sidebar-button-labels">{item.label}</span>
              </button>
            ) : (
              <NavLink
                to={item.path}
                className={buttonClass}
                title={item.label}
              >
                <span className="sidebar-button-icons" aria-hidden="true">{item.icon}</span>
                <span className="sidebar-button-labels">{item.label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
