// import React, { useEffect, useState } from 'react';
// import Preloader from './Preloader.js';
import '../Style/App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
// import Footer from './Footer';
import Contact from './Contact';
import Education from './Education.js';
import Experience from './Experience.js';
import Skills from './Skills.js';
import Project from './Project.js';
import Achievement from './Achievement';
import SideLink from './SideLink';
import StarryBackground from '../Animation/StarryBackground';
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
      {/* <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/extras" element={<Extras />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter> */}
      <StarryBackground />     
      <Navbar />
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      {/* <Home />
      <About /> */}
      <div id='education'><Education /></div>
      {/* <Experience /> */}
      <div id="experience"><Experience /></div>
      <div id="skills"><Skills /></div>
      <div id="project"><Project /></div>
      <div id="achievement"><Achievement /></div>
      <div id="contact"><Contact /></div> 
      <SideLink />
      {/* <Footer /> */}
    </div>
  );
}


