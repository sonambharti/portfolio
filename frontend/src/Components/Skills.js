import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCode, FaDatabase, FaBookOpen, FaLaptopCode, 
  FaServer, FaBrain, FaRobot, FaCloud, FaTools 
} from 'react-icons/fa';
import '../Style/Skills.css';

const { skillData } = require('../data/SkillData.js');

const categoryIcons = {
  "Programming Languages": <FaCode />,
  "Databases & Storage": <FaDatabase />,
  "Core CS Fundamentals": <FaBookOpen />,
  "Frameworks & Libraries": <FaLaptopCode />,
  "Vector Databases & Retrieval": <FaServer />,
  "Agentic AI": <FaBrain />,
  "GenAI Tools": <FaRobot />,
  "Cloud & DevOps": <FaCloud />,
  "Developer Tools & Practices": <FaTools />
};

export default function Skills() {
  // Key icons to display in the orbiting galaxy view, grouped by category in orbits
  const orbit1 = [
    { name: "Python", icon: "python" },
    { name: "JavaScript", icon: "js" },
    { name: "Java", icon: "java" },
    { name: "C++", icon: "cpp" },
    { name: "React.js", icon: "react" },
    { name: "Node.js", icon: "nodejs" }
  ];
  
  const orbit2 = [
    { name: "MySQL", icon: "mysql" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Redis", icon: "redis" },
    { name: "DynamoDB", icon: "dynamodb" },
    { name: "AWS S3", icon: "aws" },
    { name: "SQLite", icon: "sqlite" }
  ];
  
  const orbit3 = [
    { name: "FastAPI", icon: "fastapi" },
    { name: "Docker", icon: "docker" },
    { name: "Kubernetes", icon: "kubernetes" },
    { name: "AWS", icon: "aws" },
    { name: "GCP", icon: "gcp" },
    { name: "PyTorch", icon: "pytorch" },
    { name: "TensorFlow", icon: "tensorflow" },
    { name: "Git", icon: "git" }
  ];

  const getOrbitPosition = (index, total, radiusVar) => {
    const angle = (index * 2 * Math.PI) / total;
    const cos = Math.cos(angle).toFixed(4);
    const sin = Math.sin(angle).toFixed(4);
    return {
      left: `calc(50% + (${cos} * var(${radiusVar})))`,
      top: `calc(50% + (${sin} * var(${radiusVar})))`,
    };
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <div className="skills-section">
      <div className="skills-glow blob-1"></div>
      <div className="skills-glow blob-2"></div>

      {/* Restore original skill-head class and uppercase text */}
      <h1 className="skill-head">SKILLS</h1>

      {/* Milky Way Tech Galaxy Orbit */}
      <div className="galaxy-container">
        {/* Core center */}
        <div className="galaxy-core">
          <svg className="core-svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            {/* Spin only the decorative orbital lines */}
            <g className="spinning-orbit">
              <circle cx="50" cy="50" r="42" stroke="url(#coreGlow)" strokeWidth="1" fill="none" opacity="0.4" />
              <path d="M 50 12 A 38 38 0 1 0 50 88 A 38 38 0 1 0 50 12" stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="4, 6" fill="none" />
              <path d="M 18 50 A 32 32 0 1 0 82 50 A 32 32 0 1 0 18 50" stroke="#818cf8" strokeWidth="0.6" strokeDasharray="2, 4" fill="none" transform="rotate(45 50 50)" />
            </g>
            {/* Pulsing glow background for bracket */}
            <circle cx="50" cy="50" r="18" fill="rgba(99, 102, 241, 0.15)" filter="blur(2px)" />
            {/* Static Code bracket */}
            <text x="50" y="56" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold" fontFamily="monospace">
              &lt;/&gt;
            </text>
          </svg>
        </div>

        {/* Orbit Ring 1 (Inner) */}
        <div className="orbit-ring ring-1">
          {orbit1.map((item, idx) => (
            <div 
              key={idx} 
              className="galaxy-icon orbit-1-item"
              style={getOrbitPosition(idx, orbit1.length, '--radius-1')}
              title={item.name}
            >
              <img 
                src={`https://skillicons.dev/icons?i=${item.icon}`} 
                alt={item.name} 
                className="galaxy-icon-img" 
              />
            </div>
          ))}
        </div>

        {/* Orbit Ring 2 (Middle) */}
        <div className="orbit-ring ring-2">
          {orbit2.map((item, idx) => (
            <div 
              key={idx} 
              className="galaxy-icon orbit-2-item"
              style={getOrbitPosition(idx, orbit2.length, '--radius-2')}
              title={item.name}
            >
              <img 
                src={`https://skillicons.dev/icons?i=${item.icon}`} 
                alt={item.name} 
                className="galaxy-icon-img" 
              />
            </div>
          ))}
        </div>

        {/* Orbit Ring 3 (Outer) */}
        <div className="orbit-ring ring-3">
          {orbit3.map((item, idx) => (
            <div 
              key={idx} 
              className="galaxy-icon orbit-3-item"
              style={getOrbitPosition(idx, orbit3.length, '--radius-3')}
              title={item.name}
            >
              <img 
                src={`https://skillicons.dev/icons?i=${item.icon}`} 
                alt={item.name} 
                className="galaxy-icon-img" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Skill Cards Directory */}
      <motion.div 
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {skillData.map((category, idx) => (
          <motion.div 
            key={idx} 
            className="skills-card"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <div className="card-header">
              <span className="card-icon">{categoryIcons[category.type] || <FaCode />}</span>
              <h3 className="card-title">{category.type}</h3>
            </div>
            
            <div className="skills-list">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-badge">
                  {skill.icon && (
                    <img 
                      src={`https://skillicons.dev/icons?i=${skill.icon}`} 
                      alt="" 
                      className="skill-badge-icon" 
                    />
                  )}
                  <span className="skill-badge-text">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

