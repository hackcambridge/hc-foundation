import React from "react";
import './Nav.scss';
import NavElement, { NavElementProps } from "./NavElement";

import SignUpButton from "./SignUpButton";

export type NavProps = {elements: NavElementProps[]};

export default function Nav({elements}:NavProps) {
    return (
        <div className="Nav">
            {elements.map((element) => <NavElement key={element.name} {...element}/>)}
            <SignUpButton href="/dashboard"/>
        </div>
    );
}
