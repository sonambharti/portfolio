import { motion, useReducedMotion } from 'framer-motion';
import '../Style/Education.css';
const { educationData } = require('../data/EducationData.js');

const hues = ['hue-blue', 'hue-violet', 'hue-teal', 'hue-amber', 'hue-rose'];

function Degree({ education, hue }) {
    return (
        <div className="degree" style={{ '--degree-hue': `var(--${hue})` }}>
            <span className="degree-node" aria-hidden="true" />
            <span className="degree-year">{education.PassingYear}</span>
            <div className="degree-main">
                <h3 className="degree-name">{education.Degree}</h3>
                <p className="degree-spec">{education.Specialization}</p>
                <p className="degree-college">{education.College}, {education.Location}</p>
            </div>
            <span className="degree-marks">
                {education.MarksFormat === 'CGPA' ? `${education.Marks} CGPA` : education.Marks}
            </span>
        </div>
    );
}

export default function Education() {
    const reduceMotion = useReducedMotion();

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const item = {
        hidden: reduceMotion ? {} : { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    };

    const line = {
        hidden: { scaleY: reduceMotion ? 1 : 0 },
        visible: { scaleY: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <div className="education">
            <div className="container">
                <span className="section-kicker">The engineering journey</span>
                <h1 className="section-heading">Qualifications</h1>
                <motion.div
                    className="edu"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.span className="edu-line" variants={line} aria-hidden="true" />
                    {educationData.map((education, indx) => (
                        <motion.div variants={item} key={indx}>
                            <Degree education={education} hue={hues[indx % hues.length]} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
