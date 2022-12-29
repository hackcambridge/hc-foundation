import React from "react";
import './SignUpButton.scss';

export type SignUpButtonProps = {
    href: string
};

export default function SignUpButton({href}: SignUpButtonProps) {
    return (
        <a href={href} className="SignUp">Hacker's portal</a>
    );
}