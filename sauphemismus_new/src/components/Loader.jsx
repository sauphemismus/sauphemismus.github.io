import './Loader.css';

const Loader = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="loader">
      <div className="loader-inner"></div>
    </div>
  );
};

export default Loader;
