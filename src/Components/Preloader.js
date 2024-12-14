// Components/Preloader.js
import React from 'react';
import '../Style/Preloader.css'; // Import the CSS for styling

const Preloader = () => {
  return (
    <div className="preloader">
      <video autoPlay loop muted>
        <source src="Preloader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <img src="Preloader.gif" alt="Loading..." /> */}
      {/* <img src="4.png" alt="Loading..." /> */}
    </div>
  );
};

export default Preloader;