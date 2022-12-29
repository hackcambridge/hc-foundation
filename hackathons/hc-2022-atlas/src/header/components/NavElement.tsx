import React from "react";
import './NavElement.scss';

export type NavElementProps = {name: string; href: string};

export default function NavElement({name, href}: NavElementProps) {
    return (
        // <Link to={href} className="NavElement">{name}</Link>
        <a href={href} className="NavElement">{name}</a>
    );
};