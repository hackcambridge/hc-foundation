import React, { useState } from 'react';

export type SectionProps = {
    name: string;
    className: string
};

/**
 * Example Section
 * Used for copy-pasting
 */
export default function Section({name, className}: SectionProps) {
    return (
        <div className={className}>
            This is the section of name {name}
        </div>
    );
}