import React from 'react';
import './Landing.scss';
import Timer from '../components/Timer';
import Fade from 'react-reveal';

// Format is MM/DD/YYYY
export const targetDate = new Date('03/10/2023');

export type LandingProps = {
    name?: string;
    href: string;
    applicationsOpen: boolean;
};

/**
 * Landing Section
 */
export default function Landing({name, href, applicationsOpen}: LandingProps) {
    // TODO: Move state up to Landing and define all the constants here
    return (
        <div className="Landing">
            <div className={"landing-main"}>
                <Fade left>
                    <div className="landing-col1">
                        <h1 className="landing-hc-title landing-hc-title-small">Hack Cambridge</h1>
                        <h1 className="landing-hc-title landing-hc-title-big">Spyder</h1>
                        <h1 className="landing-date">11-12 Mar 2023</h1>
                        {/* <MailingListForm /> */}
                        {/* <SponsorButton /> */}
                        <p>
                        Cambridge's biggest student-run hackathon is back! <br></br>
                        Our eighth hackathon will run both virtually and in-person. <br></br>
                        We're excited to present Hack Cambridge Spyder 2023.
                        </p>
                    </div>
                </Fade>
                    <div className="landing-col2">
                        {/* <LightBulb /> */}
                        <Timer targetDate={targetDate} until={"Applications Open"}/>
                        {applicationsOpen && <a href={href} className="apply-button">Apply today!</a>}
                        {!applicationsOpen && (
                        <>
                        {/* <a href="/" className="apply-button apps-closed">Applications closed</a> */}
                        <a href="https://forms.gle/ER9FETGS1fou3XJf9" className="apply-button apps-closed">Join Mailing List</a>
                        <a href="mailto://team@hackcambridge.com" className="apply-button apps-closed">Interested in Sponsoring Us?</a>
                        </>
                        )}
                    </div>
            </div>
        </div>
    );
}