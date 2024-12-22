import { useState } from "react";
import { FaGithub } from 'react-icons/fa'; // Importing GitHub icon
import '../Style/Project.css';
const { projectData } = require('../data/ProjectData.js');

function Experiment({ project }) {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className='experiment'>
            <img src={`projImage/${project.imgUrl}`} alt={project.name} />
            <div className="exper-text">
                <h2 id="proj-name">{project.name}</h2>
                <div className="project-links">
                    {project.GithubRepo && (
                        <a href={project.GithubRepo} target="_blank" rel="noopener noreferrer">
                            <FaGithub /> GitHub
                        </a>
                    )}
                    {project.DemoLink && (
                        <a href={project.DemoLink} target="_blank" rel="noopener noreferrer">
                            Demo
                        </a>
                    )}
                </div>
                <p>
                    {project.Work}
                    {/* {showMore ? project.Work : `${project.Work.substring(0, 100)}...`}
                    <button onClick={toggleShowMore}>
                        {showMore ? 'Show Less' : 'Show More'}
                    </button> */}
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
    return (
        <div className="project">
            <h1>Projects I've Built</h1>
            <div className="pro">
                {projectData.map((project, indx) => (
                    <Experiment project={project} key={indx} />
                ))}
            </div>
        </div>
    );
}