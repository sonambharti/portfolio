import { useState } from 'react';
import { Monitor, Cpu, Robot, Database } from '@phosphor-icons/react';

const kindIcon = {
    client: Monitor,
    app: Cpu,
    service: Robot,
    data: Database,
};

export default function ArchitectureNode({ node, active }) {
    const [hovered, setHovered] = useState(false);
    const Icon = kindIcon[node.kind] || Cpu;

    return (
        <div
            className={`arch-node arch-node--${node.kind} ${active ? 'is-active' : ''}`}
            tabIndex={0}
            role="button"
            aria-label={`${node.label}: ${node.description}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
        >
            <span className="arch-node-icon"><Icon weight="duotone" /></span>
            <span className="arch-node-label">{node.label}</span>
            <span className="arch-node-sublabel">{node.sublabel}</span>

            {node.tags && node.tags.length > 0 && (
                <span className="arch-node-tags">
                    {node.tags.map((tag) => (
                        <span className="arch-node-tag" key={tag}>{tag}</span>
                    ))}
                </span>
            )}

            {hovered && (
                <div className="arch-tooltip" role="tooltip">
                    <p className="arch-tooltip-desc">{node.description}</p>
                    <div className="arch-tooltip-meta">
                        <span>Latency: {node.latency}ms</span>
                        <span className="arch-tooltip-status">Healthy</span>
                    </div>
                </div>
            )}
        </div>
    );
}
