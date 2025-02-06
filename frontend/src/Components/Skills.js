import { useState } from "react";
import '../Style/Skills.css';
const { skillsData } = require('src\data\SkillData.js');
console.log(skillsData)

function Techstack({ skill, index }) {
    return (
        <div className="techstack">
            
        </div>
    )
}

export default function Skills (){
    return (
        <div className="skills">
            <h1>🖥️ Tech Stack</h1>
            <div className="skill">
                {/* {skillsData.map((skill, indx) => (
                    <Techstack skill={skill} index={indx} key={indx} />
                ))} */}
            </div>
        </div>
    )
}