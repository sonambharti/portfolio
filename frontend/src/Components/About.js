import { motion, useReducedMotion } from 'framer-motion';
import '../Style/About.css';

const stats = [
    { value: 'M.Tech', label: 'Computer Science, IIT Jammu', hue: 'hue-blue' },
    { value: '2+ yrs', label: 'Full-stack & GenAI engineering', hue: 'hue-teal' },
    { value: 'Hyderabad', label: 'Currently building at Vibrium.ai', hue: 'hue-rose' },
];

export default function About() {
    const reduceMotion = useReducedMotion();

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const item = {
        hidden: reduceMotion ? {} : { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <div className="about">
            <div className="container">
                <h1 className="section-heading">About Me <span className="about-pronoun">(She/her)</span></h1>

                <motion.div
                    className="about-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div className="about-copy" variants={item}>
                        <p>
                            I&apos;m a software and web developer from India with a deep interest in
                            Generative AI, blockchain, and DevOps. I hold an M.Tech in Computer Science
                            from IIT Jammu and a B.Tech from Nalanda College of Engineering, both
                            completed with academic distinction.
                        </p>
                        <p>
                            Beyond day-to-day engineering, I care about open source and solving hard,
                            unglamorous problems. Wins in hackathons and national competitions, paired
                            with a solid grounding in programming fundamentals, shape how I approach new
                            work.
                        </p>
                    </motion.div>

                    <motion.div className="about-stats" variants={container}>
                        {stats.map((stat) => (
                            <motion.div
                                className="about-stat"
                                key={stat.label}
                                variants={item}
                                style={{ '--stat-hue': `var(--${stat.hue})` }}
                            >
                                <span className="about-stat-value">{stat.value}</span>
                                <span className="about-stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
