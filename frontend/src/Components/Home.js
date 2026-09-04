import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-scroll';
import '../Style/Home.css';

export default function Home() {
    const interests = useMemo(() => [
        'Software Development',
        'Web Development',
        'Machine Learning',
        'Deep Learning',
        'Generative AI',
        'Prompt Engineering',
        'Blockchain',
    ], []);

    const [currentInterest, setCurrentInterest] = useState(0);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentInterest((prev) => (prev + 1) % interests.length);
        }, 2200);
        return () => clearInterval(intervalId);
    }, [interests]);

    const portraitRef = useRef(null);
    const rawX = useMotionValue(0);
    const x = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.4 });

    useEffect(() => {
        if (reduceMotion) return;
        const node = portraitRef.current;
        if (!node) return;

        function handleMove(e) {
            const rect = node.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            rawX.set(relX * 12);
        }

        function handleLeave() {
            rawX.set(0);
        }

        window.addEventListener('mousemove', handleMove);
        node.addEventListener('mouseleave', handleLeave);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            node.removeEventListener('mouseleave', handleLeave);
        };
    }, [reduceMotion, rawX]);

    return (
        <section className="home">
            {!reduceMotion && (
                <video
                    className="home-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                >
                    <source src="/Self/Portfolio-video.mp4" type="video/mp4" />
                </video>
            )}
            <div className="home-video-overlay" aria-hidden="true" />
            <div className="home-inner container">
                <motion.div
                    className="home-copy"
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="home-eyebrow">Full Stack Developer × AI Engineer</span>

                    <h1 className="home-headline">
                        <span className="home-headline-lead">Hi, I&apos;m</span>
                        Sonam Bharti
                    </h1>

                    <p className="home-subtext">
                        Building intelligent digital products, scalable systems, and experiences
                        powered by modern web technologies and AI.
                    </p>

                    <div className="home-interest" aria-live="polite">
                        <span className="home-interest-label">Currently exploring</span>
                        <span className="home-rotator">{interests[currentInterest]}</span>
                        <div className="home-dots" aria-hidden="true">
                            {interests.map((_, index) => (
                                <span
                                    key={index}
                                    className={`home-dot ${index === currentInterest ? 'is-active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="home-ctas">
                        <Link
                            to="project"
                            smooth={true}
                            duration={800}
                            offset={-64}
                            className="home-cta-primary"
                        >
                            View Projects
                        </Link>
                        <a
                            id="download"
                            target="_blank"
                            href="https://drive.google.com/file/d/1rkrtqk4DTfs852nEC10ZT4BUl18h-dkW/view?usp=sharing"
                            rel="noreferrer"
                            className="home-cta-secondary"
                        >
                            Download Résumé
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="home-portrait"
                    ref={portraitRef}
                    style={{ x }}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                    <img src="/Self/Self-corporate.png" alt="Portrait of Sonam Bharti" />
                </motion.div>
            </div>
        </section>
    );
}
