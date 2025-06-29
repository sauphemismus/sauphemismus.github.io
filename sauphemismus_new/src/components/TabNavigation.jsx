import { NavLink } from 'react-router-dom';
import './TabNavigation.css';

const TabNavigation = ({ themes }) => {
  return (
    <nav className="tab-navigation">
      {Object.entries(themes).map(([key, theme]) => (
        <NavLink
          key={key}
          to={`/${key}`}
          className={({ isActive }) => 
            `tab ${isActive ? 'active' : ''}`
          }
        >
          <span className="tab-emoji">{theme.emoji}</span>
          <span className="tab-title">{theme.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default TabNavigation;
