import React from "react";

import './Footer.scss';

import fb from '../shared/img/facebook.png';
import linkedin from '../shared/img/linkedin.png';
import instagram from '../shared/img/instagram.png';
import email from '../shared/img/email.png';
// import MailingListForm from "./MailingListForm";


export type FooterProps = {};

export default function Footer(props: FooterProps) {
    return <div className="Footer">
        <div className="JoinUs">
            <a href="https://forms.gle/w6AuXp8xmVi3HPHE7"><h1>Join our mailing list!</h1></a>
            {/* <MailingListForm /> */}
        </div>
        <div className="SocialMedia">
            <a href="mailto://team@hackcambridge.com">
                <img src={email} alt="email" />
            </a>
            <a href="https://www.facebook.com/hackcambridge">
                <img src={fb} alt="Facebook"/>
            </a>
            <a href="https://www.linkedin.com/company/hack-cambridge">
                <img src={linkedin} alt="Linkedin"/>
            </a>
            <a href="https://www.instagram.com/hack_cambridge/">
                <img src={instagram} alt="Instagram"/>
            </a>
        </div>
    </div>;
}

