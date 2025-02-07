import React, { useState, useEffect } from 'react';
import '../Style/Home.css';


export default function Home() {
    const interests = ['Software Development',
                        'Web Development',
                        'Machine Learning',
                        'Deep Learning',
                        'Generative AI',
                        'Prompt Engineering',
                        'Blockchain',
                        'Blog Writing',
                    ];

    const fullName = 'SONAM BHARTI';                    
    // const [typedText, setTypedText] = useState('');
    const [currentInterest, setCurrentInterest] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentInterest((prevInterest) => (prevInterest + 1) % interests.length);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [interests]);

    // useEffect(() => {
    //     let index = 0;
    //     setTypedText(''); // Clear previous text before starting typing
    //     const typingInterval = setInterval(() => {
    //         if (index < fullName.length) {
    //             setTypedText((prev) => prev + fullName[index]);
    //             index++;
    //         } else {
    //             clearInterval(typingInterval);
    //         }
    //     }, 300); // Adjust typing speed here
    //     return () => clearInterval(typingInterval);
    // }, [fullName]);

    return (
        <div className='home'>
            {/* <img src='Sona.jpg' alt='Picture' className='image'/> */}
            <div className="home-text">
                <h1>Hi!</h1>
                {/* <span style={{display:'flex'}}><h1>Hi!</h1><img src={Waving} alt=' ' style={{width:'50px', height:'auto'}}/></span> */}
                <h3 style={{fontSize: "50px", bottom:'0px', top:'0px'}}>I'm</h3>
                {/* <h2>{typedText}</h2> */}
                <div className="typewriter" style={{bottom:'0px', top:'0px'}}>
                    <h2 id='full-name'>{fullName}</h2>
                </div>
                <p className="sw" style={{fontSize:"1.5rem"}}>A Software Engineer having interest in ...</p>
                <p className="interest" >
                    {interests[currentInterest]}
                </p>
                <p></p>
                <div className="dots">
                    {interests.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentInterest ? 'active' : ''}`}
                    ></span>
                    ))}
                </div>
                <a id='download' href='Sona.jpg' download>
                    <button className="download-button">Download Resume</button>
                </a>
            </div>
        </div>
    );
}
