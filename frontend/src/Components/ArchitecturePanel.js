import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import ArchitectureNode from './ArchitectureNode';
import DataFlow from './DataFlow';
import '../Style/ArchitecturePanel.css';

const STEP_MS = 900;

function buildSteps(path) {
    const forward = [];
    for (let i = 0; i < path.length - 1; i++) forward.push({ from: path[i], to: path[i + 1], dir: 'request' });
    const backward = [];
    for (let i = path.length - 1; i > 0; i--) backward.push({ from: path[i], to: path[i - 1], dir: 'response' });
    return [...forward, ...backward];
}

export default function ArchitecturePanel({ project }) {
    const reduceMotion = useReducedMotion();
    const [flowIndex, setFlowIndex] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);
    const [metrics, setMetrics] = useState({ rps: 128, latency: 42 });

    const flow = project.flows[flowIndex];
    const steps = useMemo(() => buildSteps(flow.path), [flow]);
    const activeStep = !reduceMotion && steps[stepIndex]
        ? { ...steps[stepIndex], label: flow.label }
        : null;

    useEffect(() => {
        setStepIndex(0);
    }, [flowIndex]);

    useEffect(() => {
        if (reduceMotion) return undefined;
        const id = setInterval(() => {
            setStepIndex((s) => {
                if (s < steps.length - 1) return s + 1;
                setFlowIndex((f) => (f + 1) % project.flows.length);
                return s;
            });
        }, STEP_MS);
        return () => clearInterval(id);
    }, [steps, reduceMotion, project.flows.length]);

    useEffect(() => {
        const id = setInterval(() => {
            setMetrics((m) => ({
                rps: Math.max(60, Math.min(220, Math.round(m.rps + (Math.random() * 20 - 10)))),
                latency: Math.max(18, Math.min(140, Math.round(m.latency + (Math.random() * 8 - 4)))),
            }));
        }, 2200);
        return () => clearInterval(id);
    }, []);

    const highlighted = new Set();
    if (activeStep) {
        highlighted.add(activeStep.from);
        highlighted.add(activeStep.to);
    } else {
        highlighted.add(flow.path[0]);
    }

    const nodes = project.nodes;

    return (
        <div className="arch-panel">
            <div className="arch-panel-header">
                <div className="arch-panel-title">
                    <span className="arch-status-dot" aria-hidden="true" />
                    Live System Architecture
                </div>
                <span className="arch-panel-note">Simulated demo telemetry, not production metrics</span>
            </div>

            <div className="arch-metrics">
                <div className="arch-metric">
                    <span className="arch-metric-label">Status</span>
                    <span className="arch-metric-value">Operational</span>
                </div>
                <div className="arch-metric">
                    <span className="arch-metric-label">Requests</span>
                    <span className="arch-metric-value">{metrics.rps} req/s</span>
                </div>
                <div className="arch-metric">
                    <span className="arch-metric-label">Latency</span>
                    <span className="arch-metric-value">{metrics.latency}ms</span>
                </div>
                <div className="arch-metric">
                    <span className="arch-metric-label">Uptime</span>
                    <span className="arch-metric-value">99.98%</span>
                </div>
            </div>

            <div className="arch-diagram">
                <div className="arch-col arch-col-client">
                    <ArchitectureNode node={nodes.client} active={highlighted.has('client')} />
                </div>

                <div className="arch-gutter">
                    <DataFlow edge={{ from: 'client', to: 'app' }} activeStep={activeStep} reduceMotion={reduceMotion} />
                </div>

                <div className="arch-col arch-col-app">
                    <ArchitectureNode node={nodes.app} active={highlighted.has('app')} />
                </div>

                <div className="arch-gutter arch-gutter-stack">
                    <DataFlow edge={{ from: 'app', to: 'service1' }} activeStep={activeStep} reduceMotion={reduceMotion} />
                    {nodes.service2 && (
                        <DataFlow edge={{ from: 'app', to: 'service2' }} activeStep={activeStep} reduceMotion={reduceMotion} />
                    )}
                </div>

                <div className="arch-col arch-col-service">
                    <ArchitectureNode node={nodes.service1} active={highlighted.has('service1')} />
                    {nodes.service2 && <ArchitectureNode node={nodes.service2} active={highlighted.has('service2')} />}
                </div>

                {nodes.data && (
                    <>
                        <div className="arch-gutter">
                            <DataFlow edge={{ from: 'service1', to: 'data' }} activeStep={activeStep} reduceMotion={reduceMotion} />
                        </div>
                        <div className="arch-col arch-col-data">
                            <ArchitectureNode node={nodes.data} active={highlighted.has('data')} />
                        </div>
                    </>
                )}
            </div>

            <div className="arch-request-log">
                <span className="arch-request-dot" aria-hidden="true" />
                {activeStep ? `${activeStep.dir === 'request' ? 'Request' : 'Response'} · ${activeStep.label}` : flow.label}
            </div>
        </div>
    );
}
