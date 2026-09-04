import '../Style/App.css';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Education from './Education.js';
import Experience from './Experience.js';
import Skills from './Skills.js';
import Project from './Project.js';
import Achievement from './Achievement';
import SideLink from './SideLink';
import StarryBackground from '../Animation/StarryBackground';

export default function App() {
  return (
    <div className="App">
      <StarryBackground />
      <Navbar />
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      <div id='education'><Education /></div>
      <div id="experience"><Experience /></div>
      <div id="skills"><Skills /></div>
      <div id="project"><Project /></div>
      <div id="achievement"><Achievement /></div>
      <div id="contact"><Contact /></div>
      <SideLink />
    </div>
  );
}


