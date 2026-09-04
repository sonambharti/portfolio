import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ArchitecturePanel from './ArchitecturePanel';
import '../Style/ArchitecturePanel.css';

const { architectureData } = require('../data/ArchitectureData.js');

const projectNames = Object.keys(architectureData);

export default function ArchitectureShowcase() {
    const [active, setActive] = useState(projectNames[0]);
    const reduceMotion = useReducedMotion();

    return (
        <div className="arch-showcase">
            <div className="arch-showcase-header">
                <span className="section-kicker">How I engineer systems</span>
                <h3 className="arch-showcase-title">Live Architecture</h3>
                <p className="arch-showcase-sub">
                    A simplified, real view of how four of the projects below are actually built — pick one to watch a request move through it.
                </p>
            </div>

            <div className="arch-tabs" role="tablist">
                {projectNames.map((name) => (
                    <button
                        key={name}
                        role="tab"
                        aria-selected={active === name}
                        className={`arch-tab ${active === name ? 'is-active' : ''}`}
                        onClick={() => setActive(name)}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ArchitecturePanel project={architectureData[active]} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
