import React from 'react';
import './SponsorButton.css';

/**
 * @deprecated
 * TODO: need refactoring to fit new design
 */
export default function SponsorButton() {
    const handleClick: React.MouseEventHandler = (e) => {
        
    };
    return <button className="SponsorButton" onClick={handleClick}>Become a sponsor</button>
}