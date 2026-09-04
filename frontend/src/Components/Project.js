import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GithubLogo, ArrowUpRight } from "@phosphor-icons/react";
import ArchitectureShowcase from './ArchitectureShowcase';
import '../Style/Project.css';
const { projectData } = require('../data/ProjectData.js');

const hues = ['hue-blue', 'hue-violet', 'hue-teal', 'hue-amber', 'hue-rose'];

function Experiment({ project, hue }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="experiment" style={{ '--proj-hue': `var(--${hue})` }}>
            <div className="exper-text">
                <h2 id="proj-name">{project.name}</h2>
                <div className="project-links">
                    {project.GithubRepo && (
                        <a href={project.GithubRepo} target="_blank" rel="noopener noreferrer">
                            <GithubLogo size={15} /> GitHub
                        </a>
                    )}
                    {project.DemoLink && (
                        <a href={project.DemoLink} target="_blank" rel="noopener noreferrer">
                            <ArrowUpRight size={15} /> Demo
                        </a>
                    )}
                    {project.Extra && <span className="proj-extra">{project.Extra}</span>}
                </div>
                <p id="proj-detail">
                    <span>{isExpanded ? project.projectDetails : project.projectDetails.split(' ').slice(0, 12).join(' ') + '…'}</span>
                    <button id="exp" onClick={() => setIsExpanded((exp) => !exp)}>
                        {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                </p>
                <div className="tools">
                    {project.Tools.map((tool, index) => (
                        <span className="tool" key={index}>{tool}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Project() {
    const reduceMotion = useReducedMotion();

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
    };

    const item = {
        hidden: reduceMotion ? {} : { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <div className="project">
            <div className="container">
                <span className="section-kicker">Selected work</span>
                <h1 className="section-heading">Projects I&apos;ve Built</h1>

                <ArchitectureShowcase />

                <motion.div
                    className="pro"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.08 }}
                >
                    {projectData.map((project, indx) => (
                        <motion.div variants={item} key={indx}>
                            <Experiment project={project} hue={hues[indx % hues.length]} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
