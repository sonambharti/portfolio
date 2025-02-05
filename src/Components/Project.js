import { useState } from "react";
import { FaGithub } from 'react-icons/fa'; // Importing GitHub icon
import { FiExternalLink } from "react-icons/fi"; // Importing External Link icon
import '../Style/Project.css';
const { projectData } = require('../data/ProjectData.js');

function Experiment({ project, index }) {
    const [isExpanded, setIsExpanded] = useState(true);
    // const [isLeft, setLeft] = useState(true);
    // Determine image position based on index
    // const isLeft = index % 2 === 0; // Even index for left, odd for right
    // const isRight = isLeft ? false : true;
    const buttonStyle = {
        background: 'none',
        border: 'none',
        // font: 'inherit',
        cursor: 'pointer',
        marginLeft: '6px',
        color: isExpanded ? 'rgb(46, 179, 200)' : 'rgba(243, 19, 19, 0.941)'
    };

    return (
        <div className='experiment'>
            {/* {isLeft && <img src={`projImage/${project.imgUrl}`} alt={project.name} className="projImage" />} */}
            <div className="exper-text">
                <h2 id="proj-name">{project.name}</h2>
                <div className="project-links">
                    <p className="github">
                    {project.GithubRepo && (
                        <a href={project.GithubRepo} target="_blank" rel="noopener noreferrer">
                            GitHub <FaGithub /> 
                        </a>
                    )}
                    </p>
                    <p className="demo">
                    {project.DemoLink && (
                        <a href={project.DemoLink} target="_blank" rel="noopener noreferrer">
                            Demo <FiExternalLink />
                        </a>
                    )}
                    </p>
                    <p>
                        {project.Extra}
                    </p>
                </div>
                <p>
                    {/* {project.projectDetails} */}
                    <span>{isExpanded ? project.projectDetails : project.projectDetails.split(' ').slice(0, 12).join(' ') + "..."}</span>
                    <button onClick={() => setIsExpanded((exp) => !exp)} style={buttonStyle}>{isExpanded ? 'Show Less': 'Show More'}</button>
                </p>
                <div className="tools">
                    {project.Tools.map((tool, index) => (
                        <span className="tool" key={index}>{tool}</span>
                    ))}
                </div>
            </div>
            {/* {isRight && <img src={`projImage/${project.imgUrl}`} alt={project.name} className="projImage" />} */}
        </div>
    );
}

export default function Project() {
    
    return (
        <div className="project">
            <h1 className="proj-head">Projects I've Built</h1>
            <div className="pro">
                {projectData.map((project, indx) => (
                    <Experiment project={project} index={indx} key={indx} />
                ))}
            </div>
        </div>
    );
}