import React, { useEffect, useState } from 'react';
import Preloader from './Preloader.js';
import '../Style/App.css';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import Contact from './Contact';
import Education from './Education.js';
import Experience from './Experience.js';
import Skills from './Skills.js';
import Project from './Project.js';

export default function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate a loading delay
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000); // Change this duration as needed

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return <Preloader />;
  // }
  
  return (
    <div className="App">
      <Navbar />
      <Home />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
}


