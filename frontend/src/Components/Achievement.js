import React from 'react';
import '../Style/Achievement.css';
import { FaTrophy } from 'react-icons/fa'; // Import the trophy icon from react-icons

const achievementData = [
    'Ranked in the top 4% among GATE 2021 Computer Science candidates, showcasing exceptional aptitude.',
    'Attained top 3 position in B.Tech third year, earning prestigious Academic excellence award.',
    'Achieved under 25th rank in the HCL First Career Grand Quest 2021, a national-level competition.',
    'Secured 3rd position in TEQUIP3 hackathon organized by LNJPIT, Chapra, Bihar, demonstrating coding prowess.'
];

export default function Achievement() {
    return (
        <div className='achieve'>
            <h1 className='achieve-head'>Achievements</h1>
            <div className='achievement-list'>
                {achievementData.map((achievement, index) => (
                    <div key={index} className='achievement-item'>
                        <FaTrophy className='trophy-icon' />
                        <p className='achievement-text'>{achievement}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}