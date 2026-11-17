# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
import './Sidebar.css';

function Sidebar({isCollapsed,activeSection,onSectionChange}) {
  const sidebarItems = [
    { id: 'notes', icon: '💡', label: 'Notes', path: '/notes' },
    { id: 'reminders', icon: '🔔', label: 'Reminders', path: '/reminders' },
    { id: 'archive', icon: '📥', label: 'Archive', path: '/archive' },
    { id: 'trash', icon: '🗑️', label: 'Trash', path: '/trash' },
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