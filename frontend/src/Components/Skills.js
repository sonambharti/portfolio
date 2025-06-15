import { useState } from "react";
import { motion } from "framer-motion";
import { Tooltip } from 'react-tooltip';
import '../Style/Skills.css';
// const { skillsData } = require('src/data/SkillData.js');
// console.log(skillsData)

export default function Skills() {
  const iconList =
    "c,cpp,java,python,fastapi,html,css,js,react,nodejs,mysql,mongodb,redis,sqlite,git,postman,docker,aws,github,vscode,tensorflow,pytorch,kubernetes";

  const icons = iconList.split(",");

  return (
    <div className="skills">
      <h1 className="skill-head">
          SKILLS
      </h1>

      <div className="skill-icon">
        {icons.map((icon, index) => (
          <motion.div
            key={icon}
            className="animated-icon"
            data-tooltip-id={`tooltip-${icon}`}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
          >
            <img
              src={`https://skillicons.dev/icons?i=${icon}`}
              alt={icon}
              className="icon-img"
            />
            <Tooltip id={`tooltip-${icon}`} content={icon} place='top' effect='solid' />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
