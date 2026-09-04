import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import '../Style/Experience.css';
import { Briefcase, Laptop } from "@phosphor-icons/react";
const {expData} = require('../data/ExperienceData.js');

// Map icon name strings to actual icon components
const iconMap = {
    FaBriefcase: Briefcase,
    FaLaptopCode: Laptop
  };

function WorkExp({exp, index, isActive, onRef}) {
    const Icon = iconMap[exp.icon];
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();

    // Per-entry timeline line: fills as this entry scrolls through the viewport,
    // fading out toward the end of the entry (gradient lives in CSS).
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start center', 'end center'],
    });
    const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

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
        <div
            ref={(el) => { ref.current = el; onRef(index, el); }}
            key={index}
            className={`relative ${isActive ? 'is-active' : 'is-subdued'}`}
        >
        <div className='icon'>
            <Icon />
        </div>
        <motion.div
            className='lines'
            style={{ scaleY: reduceMotion ? 1 : lineScale }}
            aria-hidden="true"
        />
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
    const itemRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = itemRefs.current.indexOf(entry.target);
                        if (idx !== -1) setActiveIndex(idx);
                    }
                });
            },
            { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
        );
        itemRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
      <main className="main-exps container">
        <h1 className="section-heading">Experience</h1>
        <div className='experience'>
          {expData.map((exp, index) => (
            <WorkExp
                exp={exp}
                key={index}
                index={index}
                isActive={activeIndex === index}
                onRef={(idx, el) => { itemRefs.current[idx] = el; }}
            />
          ))}
        </div>
      </main>
    );
  };
