import { useEffect, useRef } from 'react';
import '../Style/Experience.css';
import { FaBriefcase, FaLaptopCode } from "react-icons/fa";
const {expData} = require('../data/ExperienceData.js');

// Map icon name strings to actual icon components
const iconMap = {
    FaBriefcase: FaBriefcase,
    FaLaptopCode: FaLaptopCode
  };

function WorkExp({exp, index}) {
    // const Icon = exp.icon === "FaBriefcase" ? FaBriefcase : FaLaptopCode;
    const Icon = iconMap[exp.icon];
    const ref = useRef(null);

    useEffect(() => {
        // 1. Copy ref.current to a variable inside the effect
        const currentRef = ref.current; 
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div ref={ref} key={index} className="relative">
        <div className='icon'>
            <Icon />
        </div>
        {index !== expData.length - 1 && (
            <div className='lines'></div>
        )}
        <div className='exp-details'>
            <h3 className='exp-position'>{exp.Position}</h3>
            <span className='duration'>{exp.Duration}</span>
        </div>
        <p className='organisation'>
            <span id='org'>{exp.Orgainisation}, </span>
            <span id='loc'>{exp.Location}</span>
        </p>
        <ul>
            {exp.Experience.map((point, pointIndex) => (
            <li key={pointIndex} className='exp-points'>{point}</li>
            ))}
        </ul>
        <div className='tools'>
            {exp.Tools.map((tech, techIndex) => (
            <span
                key={techIndex}
                className='tool'
            >
                {tech}
            </span>
            ))}
        </div>
        </div>
    );
}
export default function Experience() {
    return (
      <main className="main-exps">
        {/* <Header /> */}
        <h1>Experience</h1>
        <div className='experience'>
          {expData.map((exp, index) => (
            <WorkExp exp={exp} key={index} />
          ))}
        </div>
      </main>
    );
  };