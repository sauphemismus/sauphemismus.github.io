import './BackgroundContainer.css';

const BackgroundContainer = ({ backgroundImages, activeIndex }) => {
  return (
    <div className="background-container">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`background-layer ${index === activeIndex ? 'active' : ''}`}
          style={{
            backgroundImage: image ? `url("${image}")` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}
      <div className="background-overlay" />
    </div>
  );
};

export default BackgroundContainer;
