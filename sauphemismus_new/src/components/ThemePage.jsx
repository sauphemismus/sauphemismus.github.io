import { useParams } from 'react-router-dom';
import { useTextBuffer } from '../hooks/useTextBuffer';
import { useBackgroundManager } from '../hooks/useBackgroundManager';
import BackgroundContainer from './BackgroundContainer';
import Loader from './Loader';
import ShareButton from './ShareButton';
import themesData from '../data/themes.json';
import './ThemePage.css';

const ThemePage = () => {
  const { themeId } = useParams();
  const theme = themesData.themes[themeId];
  
  const { currentText, getNextText, isLoading } = useTextBuffer(theme);
  const { backgroundImages, activeIndex, changeBackground } = useBackgroundManager(theme);

  const handleGenerate = async () => {
    const newText = await getNextText();
    if (newText) {
      // Change background with the new text for keyword analysis
      changeBackground(newText);
    }
  };

  if (!theme) {
    return (
      <div className="theme-page">
        <div className="error-message">
          <h2>Theme not found</h2>
          <p>The requested theme "{themeId}" does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BackgroundContainer 
        backgroundImages={backgroundImages}
        activeIndex={activeIndex}
      />
      
      <div className="theme-page">
        <div className="content-container">
          <h1 className="theme-title">
            <span className="theme-emoji">{theme.emoji}</span>
            {theme.title}
          </h1>
          
          <div className="output-container">
            {isLoading ? (
              <Loader isVisible={true} />
            ) : (
              currentText && (
                <div className="output-text">
                  <h2>{currentText}</h2>
                </div>
              )
            )}
          </div>
          
          <div className="actions-container">
            <button 
              className="generate-button"
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {theme.buttonText}
            </button>
            
            {currentText && (
              <ShareButton text={currentText} theme={theme} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemePage;
