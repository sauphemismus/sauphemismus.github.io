import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TabNavigation from './components/TabNavigation';
import ThemePage from './components/ThemePage';
import themesData from './data/themes.json';
import './App.css';

function App() {
  const themes = themesData.themes;
  const firstTheme = Object.keys(themes)[0];

  // Use basename only in production (GitHub Pages)
  const basename = import.meta.env.PROD ? '/sauphemismus_new' : '';

  return (
    <Router basename={basename}>
      <div className="app">
        <TabNavigation themes={themes} />
        
        <Routes>
          <Route path="/" element={<Navigate to={`/${firstTheme}`} replace />} />
          <Route path="/:themeId" element={<ThemePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
