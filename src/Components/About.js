import '../Style/About.css';
import coding from '../image/coding.gif';
import eating from '../image/eating.gif';
import sleepNCode from '../image/sleep-n-code.gif';

export default function About() {
    return (
        <div className="about-component">
            <div className="about">
                <h1 className='heading'>💫 About Me (She/her)</h1>
                <div className='about-text'>
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
                        <li>
                            <span>
                                <p>Contributing on Python, React and AI projects</p>
                                <img src={coding} alt='Coding GIF' />
                            </span>
                        </li>
                        <li>
                            <span>
                                <p>Exploring new technologies</p>
                                <img src={eating} alt='Eating GIF' />
                            </span>
                        </li>
                        <li>
                            <span>
                                <p>Balancing work and relaxation</p>
                                <img src={sleepNCode} alt='Sleep and Code GIF' />
                            </span>
                        </li>
                        <li>
                            <span>
                                <p>Looking for opportunities</p>
                                <img src={coding} alt='Code GIF' />
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='about-image'>
                <img id='myself' src='icon.png' alt='myself'/>
            </div>
        </div>
    )
}