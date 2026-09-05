import React from 'react';
import { motion } from 'framer-motion';
import {
  Code, Database, GraduationCap, Stack, MagnifyingGlass,
  Robot, Sparkle, CloudArrowUp, Wrench
} from '@phosphor-icons/react';
import '../Style/Skills.css';

const { skillData } = require('../data/SkillData.js');

const categoryIcons = {
  "Programming Languages": Code,
  "Databases & Storage": Database,
  "Core CS Fundamentals": GraduationCap,
  "Frameworks & Libraries": Stack,
  "Vector Databases & Retrieval": MagnifyingGlass,
  "Agentic AI": Robot,
  "GenAI Tools": Sparkle,
  "Cloud & DevOps": CloudArrowUp,
  "Developer Tools & Practices": Wrench,
};

// one signature hue per card, cycling so neighbouring cards read distinctly
const hues = ['hue-blue', 'hue-violet', 'hue-teal', 'hue-amber', 'hue-rose'];

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06
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
      <div className="container">
        <span className="section-kicker">Toolbox</span>
        <h1 className="section-heading">Skills</h1>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {skillData.map((category, idx) => {
            const Icon = categoryIcons[category.type] || Code;
            const hue = hues[idx % hues.length];
            return (
              <motion.div
                key={idx}
                className="skills-card"
                style={{ '--card-hue': `var(--${hue})` }}
                variants={cardVariants}
                whileHover={{ y: -4 }}
              >
                <div className="card-header">
                  <span className="card-icon"><Icon weight="duotone" /></span>
                  <h3 className="card-title">{category.type}</h3>
                </div>
                <div className="skills-list">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-badge">
                      {skill.icon && (
                        <img
                          src={`https://skillicons.dev/icons?i=${skill.icon}`}
                          alt=""
                          className="skill-badge-icon"
                          loading="lazy"
                        />
                      )}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
