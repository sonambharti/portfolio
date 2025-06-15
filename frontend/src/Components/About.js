import '../Style/About.css';
import coding from '../image/coding.gif';
import eating from '../image/eating-rbg.gif';
import sleepNCode from '../image/sleep-n-code-rbg.gif';

export default function About() {
    return (
        <div className="about-scene">
            <h1 className='about-head'>About Me (She/her)</h1>
            <div className="about-cube">
                {/* Face 1 */}
                <div className="face face1">
                    <div className="face1-content">
                        <div className="intro-text">
                            <h2>Hover or Tap to Know More...</h2>
                        </div>
                        <div className="intro-img">
                            <img src="sdegree.jpg" alt="myself" />
                        </div>
                    </div>
                </div>

                {/* Face 2 - empty vibrant background */}
                <div className="face face2">
                    {/* decorative empty face */}
                </div>

                {/* Face 3 - About content */}
                <div className="face face3">
                    <div className="about-text">
                        <p className='para'>
                            I'm a passionate software🌈 and web🌐 developer🎯 from India 🚀
                            with a deep enthusiasm for Generative AI🤖, Blockchain🔗 and DevOps.
                            I hold an M.Tech in Computer Science from IIT Jammu and a B.Tech from 
                            Nalanda College of Engineering, both completed with academic distinction. 
                            <br />
                            Beyond coding, I am a 📊 strong advocate for 📜 open source and innovation🤖,
                            always eager to solve challenging problems🤔. Achievements in hackathons,
                            national competitions, and a solid foundation in programming 
                            reflect my commitment to excellence in the tech space.
                        </p>
                        <ul className='about-list'>
                            <li><span><p>Contributing on Python, React and AI projects</p><img src={coding} alt='Coding GIF' /></span></li>
                            <li><span><p>Exploring new technologies</p><img src={eating} alt='Eating GIF' /></span></li>
                            <li><span><p>Balancing work and relaxation</p><img src={sleepNCode} alt='Sleep and Code GIF' /></span></li>
                            <li><span><p>Looking for opportunities</p><img src={coding} alt='Code GIF' /></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
