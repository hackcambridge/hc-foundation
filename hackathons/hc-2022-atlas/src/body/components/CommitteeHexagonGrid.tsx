import React from 'react';
import './CommitteeHexagonGrid.scss';

export type CommitteeHexagonGridProps = {committeeMembers: {image: string, caption: string}[]};

/**
 * @deprecated
 * Committee hexagon grid
 * TODO: Refactor because this class defo is NOT good react practice. Rather, it's just code copy pasted from internet
 * @param committeeMembers - {image: string, caption: string}[]
 */
export default function CommitteeHexagonGrid({committeeMembers}: CommitteeHexagonGridProps) {
    return (
        <ul className="hex-grid__list">
            {committeeMembers.map((member, n) => (
                <li key={member.caption} className="hex-grid__item">
                    <div className="hex-grid__content">
                        {n}
                    </div>
                </li>
            ))}
        </ul>
    );
}
