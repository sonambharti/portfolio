import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

export default function DataFlow({ edge, activeStep, reduceMotion }) {
    const isForward = activeStep && activeStep.from === edge.from && activeStep.to === edge.to;
    const isReverse = activeStep && activeStep.from === edge.to && activeStep.to === edge.from;
    const isActive = isForward || isReverse;

    return (
        <div className={`arch-connector ${isActive ? 'is-active' : ''}`}>
            <span className="arch-connector-line" />
            <ArrowRight className="arch-connector-arrow" weight="bold" />

            {isActive && !reduceMotion && (
                <motion.span
                    className="arch-connector-dot"
                    initial={{ left: isForward ? '2%' : '92%', opacity: 0 }}
                    animate={{ left: isForward ? '92%' : '2%', opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                />
            )}

            {isActive && (
                <span className="arch-connector-label">{activeStep.label}</span>
            )}
        </div>
    );
}
