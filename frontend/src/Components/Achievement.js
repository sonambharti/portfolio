import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Trophy } from '@phosphor-icons/react';
import '../Style/Achievement.css';

const achievementData = [
    'Ranked in the top 4% among GATE 2021 Computer Science candidates, showcasing exceptional aptitude.',
    'Attained top 3 position in B.Tech third year, earning an Academic Excellence award.',
    'Achieved under 25th rank in the HCL First Career Grand Quest 2021, a national-level competition.',
    'Secured 3rd position in the TEQUIP3 hackathon organized by LNJPIT, Chapra, Bihar.'
];

export default function Achievement() {
    const reduceMotion = useReducedMotion();

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const item = {
        hidden: reduceMotion ? {} : { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <div className="achieve">
            <div className="container">
                <h1 className="section-heading">Achievements</h1>
                <motion.div
                    className="achievement-list"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {achievementData.map((achievement, index) => (
                        <motion.div key={index} className="achievement-item" variants={item}>
                            <Trophy className="trophy-icon" weight="duotone" />
                            <p className="achievement-text">{achievement}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
