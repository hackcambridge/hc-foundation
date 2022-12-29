import React from 'react';
import HexGrid from '../components/HexGrid';
import './Sponsors.scss';
import Fade from 'react-reveal';
import { useWindowResize } from '../../shared/util/useWindowResize';

export type Sponsor = {
    name: string,
    tier: 'Cohost'|'Tera'|'Giga' | 'Giga + Meal' |'Mega'|'Mega + Meal' | 'Mega + Coffee'|'Kilo'| 'Meal' | '',
    image: string,
    href: string,
    isPlaceHolder: boolean
};

export type SponsorsProps = {
    cohost: Sponsor;
    tera: Sponsor[];
    giga: Sponsor[];
    mega: Sponsor[];
    kilo: Sponsor[];
    meal: Sponsor[];
    partners: Sponsor[];
};

export default function Sponsors({cohost, tera, giga, mega, kilo, meal, partners}: SponsorsProps) {
    // eslint-disable-next-line
    const {width, height} = useWindowResize();
    return (
        <div className="Sponsors" id="sponsors">
            {/* <h1>Our Sponsors</h1> */}
            <h2>Cohost</h2>
            <Fade left>
            <HexGrid className={"hex-one-only"} info={[{
                title: cohost.isPlaceHolder? "Coming soon": cohost.name,
                caption: cohost.tier,
                image: cohost.image,
                visible: true,
                href: cohost.href
            }]} layoutInfo={{nHexaBig: 1, nHexaMed: 1, nHexaSmall: 1, baseSize:(width < 600)? "80vw": "30vw"}}/>
            </Fade>
            <h2>Tera</h2>
            <Fade right>
            <HexGrid info={tera.map(sponsor => {return {
                title: sponsor.isPlaceHolder? "Coming soon": sponsor.name,
                caption: sponsor.tier,
                image: sponsor.image,
                visible: true,
                href: sponsor.href
            }})} layoutInfo={{nHexaBig: 3, nHexaMed: 3, nHexaSmall: 3, baseSize:(width < 600)? "100vw": "70vw"}}/>
            </Fade>
            <h2>Giga</h2>
            <Fade left>
            <HexGrid info={giga.map(sponsor => {return {
                title: sponsor.isPlaceHolder? "Coming soon": sponsor.name,
                caption: sponsor.tier,
                image: sponsor.image,
                visible: true,
                href: sponsor.href
            }})} layoutInfo={{nHexaBig: 3, nHexaMed: 3, nHexaSmall: 3,  baseSize:(width < 600)? "100vw": "60vw"}}/>
            </Fade>
            <h2>Mega</h2>
            <Fade right>
            <HexGrid className="hex-five" info={mega.map(sponsor => {return {
                title: sponsor.isPlaceHolder? "Coming soon": sponsor.name,
                caption: sponsor.tier,
                image: sponsor.image,
                visible: true,
                href: sponsor.href
            }})} layoutInfo={{nHexaBig: 7, nHexaMed: 7, nHexaSmall: 7, baseSize:(width < 600)? "100vw": "70vw"}}/>
            </Fade>
            <h2>Kilo</h2>
            <Fade left>
            <HexGrid className={"hex-one-only"} info={kilo.map(sponsor => {return {
                title: sponsor.isPlaceHolder? "Coming soon": sponsor.name,
                caption: sponsor.tier,
                image: sponsor.image,
                visible: true,
                href: sponsor.href
            }})} layoutInfo={{nHexaBig: 1, nHexaMed: 1, nHexaSmall: 1, baseSize:(width < 600)? "40vw": "10vw"}}/>
            </Fade>
            <Fade right>
            <h2>Meal</h2>
            <HexGrid className={"hex-one-only"} info={meal.map(sponsor => {return {
                title: sponsor.isPlaceHolder? "Coming soon": sponsor.name,
                caption: sponsor.tier,
                image: sponsor.image,
                visible: true,
                href: sponsor.href
            }})} layoutInfo={{nHexaBig: 1, nHexaMed: 1, nHexaSmall: 1, baseSize:(width < 600)? "40vw": "10vw"}}/>
            </Fade>
            <h2>Our Partners</h2>
            <Fade left>
            <HexGrid info={partners.map(sponsor => {return {
                title: sponsor.isPlaceHolder? "And we are 'self-partnered'": sponsor.name,
                caption: "",
                image: sponsor.image,
                visible: true,
                href: sponsor.href
            }})} layoutInfo={{nHexaBig: 3, nHexaMed: 3, nHexaSmall: 3, baseSize:(width < 600)? "80vw": "60vw"}}/>
            </Fade>
        </div>
    );
}