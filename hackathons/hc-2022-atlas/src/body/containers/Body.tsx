import React from "react";
import AboutUs from "../sections/AboutUs";
import Committee from "../sections/Committee";
import FAQ from "../sections/FAQ";
import Landing from "../sections/Landing";
// import PastHackathons from "../sections/PastHackathons";
import PastPhotos from "../sections/PastPhotos";
import Sponsors, { Sponsor } from "../sections/Sponsors";
// import SponsorShowcase from "../sections/SponsorShowcase";
import './Body.scss';

// import timeline from '../../shared/img/Timeline.png';
import timeline2 from '../../shared/img/Timeline2.png';

import hc2016 from "../../shared/img/past-photos/hc-2016-1.jpg";
import hc2017 from "../../shared/img/past-photos/hc-2017-1.jpg";
import hc2018_1 from "../../shared/img/past-photos/hc-2018-1.jpg";
import hc2018_2 from "../../shared/img/past-photos/hc-2018-2.jpg";
import hc2019_1 from "../../shared/img/past-photos/hc-2019-1.jpg";
import hc2019_2 from "../../shared/img/past-photos/hc-2019-2.jpg";
import hc2019_3 from "../../shared/img/past-photos/hc-2019-3.jpg";
import hc2020_1 from "../../shared/img/past-photos/hc-2020-1.jpg";
import hc2020_2 from "../../shared/img/past-photos/hc-2020-2.jpg";
import hc2021 from '../../shared/img/past-photos/hc-2021-1.png';

import zoey from '../../shared/img/committee/Zoey.jpg';
import theo from '../../shared/img/committee/Theo.jpg';
import khalid from '../../shared/img/committee/Khalid.jpg';
import marcus from '../../shared/img/committee/Marcus.jpg';
import jonathan from '../../shared/img/committee/Jonathan.jpg';
import ayush from '../../shared/img/committee/Ayush.jpg';
import vincent from '../../shared/img/committee/Vincent.jpeg';
import jacky from '../../shared/img/committee/Jacky.jpeg';
import holly from '../../shared/img/committee/Holly.jpg';
import katrina from '../../shared/img/committee/Katrina.jpg';
import rishita from '../../shared/img/committee/Rishita.jpg';
import xinyu from '../../shared/img/committee/Xinyu.jpg';
import komal from '../../shared/img/committee/Komal.jpg';

import placeHolderLogo from '../../shared/img/Logo_White.png';
import mw from '../../shared/img/sponsors/marshall_wace_blue.png';
import reply from '../../shared/img/sponsors/reply_logo.svg';
import huawei from '../../shared/img/sponsors/huawei2.png';
import datascope from '../../shared/img/sponsors/datascope.jpg';
// import citadel from '../../shared/img/sponsors/citadel.png';
import graphcore from '../../shared/img/sponsors/graphcore.png';
import gresearch from '../../shared/img/sponsors/g-research.png';
import janestreet from '../../shared/img/sponsors/janestreet.png';
import wolfram from '../../shared/img/sponsors/wolfram.png';
// import featurespace from '../../shared/img/sponsors/featurespace.png';
// import featurespace2 from '../../shared/img/sponsors/featurespace2.png';
import featurespace3 from '../../shared/img/sponsors/featurespace3.png';
import hrt from '../../shared/img/sponsors/HRT.svg';
import bigpay from '../../shared/img/sponsors/Bigpay.svg';
import deepgram from '../../shared/img/sponsors/deepgram2.svg';
import optiver from '../../shared/img/sponsors/optiver.png';
import blackrock from '../../shared/img/sponsors/BLK_eng_black_rgb.png';
import theodo from '../../shared/img/sponsors/theodo.png';

import hcuk from '../../shared/img/sponsors/HackathonUK.svg';
import mlh from '../../shared/img/sponsors/mlh-logo-color.svg';

import Timeline from "../sections/Timeline";
import SponsorShowcase, { SponsorShowcaseInfo } from "../sections/SponsorShowcase";

export type BodyProp = {

};

// This is temporary.
// TODO: need to put this in some config file and then we can import this afterwards

const cohost : Sponsor = 
    {
        name: "Marshall Wace",
        tier: 'Cohost',
        href: 'https://www.mwam.com/',
        image: mw,
        isPlaceHolder: false
    };

const tera : Sponsor[] = [
    {
        name: "Huawei",
        tier: 'Tera',
        href: 'https://www.huawei.com/',
        image: huawei,
        isPlaceHolder: false
    },
    // {
    //     name: "Something",
    //     tier: '',
    //     href: '',
    //     image: placeHolderLogo,
    //     isPlaceHolder: true
    // },
    {
        name: "Reply",
        tier: 'Tera',
        href: 'https://www.reply.com',
        image: reply,
        isPlaceHolder: false
    },
    {
        name: "Optiver",
        tier: 'Tera',
        href: 'https://www.optiver.com/',
        image: optiver,
        isPlaceHolder: false
    }
];

const giga: Sponsor[] = [
    {
        name: "Deepgram",
        tier: 'Giga + Meal',
        href: 'https://deepgram.com/',
        image: deepgram,
        isPlaceHolder: false
    },
    {
        name: "Graphcore",
        tier: 'Giga',
        href: 'https://www.graphcore.ai/',
        image: graphcore,
        isPlaceHolder: false
    },
    {
        name: "BlackRock",
        tier: 'Giga',
        href: 'https://careers.blackrock.com/early-careers/',
        image: blackrock,
        isPlaceHolder: false
    },
];

const mega: Sponsor[] = [
    {
        name: "Hudson River Trading",
        tier: 'Mega',
        href: 'https://www.hudsonrivertrading.com/',
        image: hrt,
        isPlaceHolder: false
    },
    {
        name: "G-Research",
        tier: 'Mega + Meal',
        href: 'https://www.gresearch.co.uk/',
        image: gresearch,
        isPlaceHolder: false
    },
    {
        name: "Featurespace",
        tier: 'Mega + Coffee',
        href: 'https://www.featurespace.com/',
        image: featurespace3,
        isPlaceHolder: false
    },
    {
        name: "Jane Street",
        tier: 'Mega + Meal',
        href: 'https://www.janestreet.com/',
        image: janestreet,
        isPlaceHolder: false
    },
    {
        name: "BigPay",
        tier: 'Mega',
        href: 'https://www.bigpayme.com/',
        image: bigpay,
        isPlaceHolder: false
    },
    {
        name: "Theodo",
        tier: "Mega",
        href: "https://www.theodo.co.uk/",
        image: theodo,
        isPlaceHolder: false
    },
    {
        name: "Something",
        tier: "",
        href: "",
        image: placeHolderLogo,
        isPlaceHolder: true
    }
];

const kilo: Sponsor[] = [
    {
        name: "Wolfram",
        tier: 'Kilo',
        href: 'https://www.wolfram.com/',
        image: wolfram,
        isPlaceHolder: false
    },
];

const partners: Sponsor[] = [
    {
        name: "MLH",
        tier: '',
        href: 'https://mlh.io/',
        image: mlh,
        isPlaceHolder: false
    },
    {
        name: "Hackathons UK",
        tier: '',
        image: hcuk,
        href: "https://hackathons.org.uk/",
        isPlaceHolder: false
    }, 
    {
        name: "Placeholder",
        tier: "",
        href: "",
        image: placeHolderLogo,
        isPlaceHolder: true
    }
];

const meal: Sponsor[] = [
    {
        name: "Datascope",
        tier: 'Meal',
        href: 'https://datascope.co.uk/',
        image: datascope,
        isPlaceHolder: false
    },
];


const sponsorShowcaseInfo: SponsorShowcaseInfo[] = [
    {
        sponsor: "Marshall Wace",
        logo: mw,
        logoMinHeight: "100px",
        videoLink: 'https://hc-upload.s3.eu-west-2.amazonaws.com/sponsor-videos/mw.mp4',
        text: `We are a global alternative investment management company where clients come first.
        Our core purpose is to deliver returns for our clients who entrust their assets to our care.
        As a firm, we have a hunger to do more, chasing innovation and pushing the boundaries of what’s possible. Technological innovation has long been the cornerstone of our business. We continuously invest in our systems, data, infrastructure and people in our efforts to maximise the alpha we deliver for our clients.
        `
    },
    {
        sponsor: "Reply",
        logo: reply,
        videoLink: "https://hc-upload.s3.eu-west-2.amazonaws.com/sponsor-videos/reply.mp4",
        text: `Reply is a company that specialises in Consulting, Systems Integration and Digital Services with a focus on the conception, design and implementation of solutions based on the new communication channels and digital media. Reply partners with key industrial groups in defining and developing business models made possible by the new technological and communication paradigms such as Artificial Intelligence, Big Data, Cloud Computing, Digital Communication, the Internet of Things and Mobile and Social Networking. In so doing, it aims to optimise and integrate processes, applications and devices.`
    },
    {
        sponsor: "Huawei",
        logo: huawei,
        //videoElement: ({className, width, height}) => (<iframe className={className} title="Video for Huawei" src="https://drive.google.com/file/d/18_USXDYK4exH8qNWeKUdiYggDg85j59k/preview" width={width} height={height} allow="autoplay" allowFullScreen></iframe>),
        videoLink:"https://hc-upload.s3.eu-west-2.amazonaws.com/sponsor-videos/huawei.mp4",
        text: `Founded in 1987, Huawei is a leading global provider of information and communications technology (ICT) infrastructure and smart devices. We have more than 194,000 employees, and we operate in more than 170 countries and regions, serving more than three billion people around the world. Huawei is a private company wholly owned by its employees. Through the Union of Huawei Investment & Holding Co., Ltd., we implement an Employee Shareholding Scheme involving 104,572 employees. Only Huawei employees are eligible to participate. No government agency or outside organization holds shares in Huawei.`
    },
    {
        sponsor: "Optiver",
        logo: optiver,
        videoLink: "https://hc-upload.s3.eu-west-2.amazonaws.com/sponsor-videos/optiver.mp4",
        text: "Optiver is a leading global trading firm powered by technical innovation. For 35+ years, Optiver has been improving financial markets around the world, making them healthier and more efficient for all participants. With our focus on cutting-edge engineering, data science and research, we actively trade on 50+ exchanges, where we’re trusted to always provide accurate buy and sell pricing – no matter the market conditions. To be not only active, but also precise, across such a volume of markets and products is a hugely complex challenge, which is exactly what we thrive on."
    },
];


const faqQuestions = [
    {
        question: "What is a hackathon?",
        answer: "A hackathon is an invention marathon. Thoughts become things. Attendees work in teams of up to 4 people to hack together a prototype to solve a problem; this could be a web app, hardware-hack, or something completely different.",
        folded: false
    },
    {
        question: "How does the hybrid Hackathon work？Can my team be considered for prizes or chat with your sponsors?",
        answer: "We will invite ~300 participants to join us in-person at Cambridge for the Event and 200 to join us through Discord. All workshops and engagement sessions will happen in-person while being live-streamed on Discord. Our sponsors will join Discord to interact with you if you participate online. Judging for online participants will take place through Discord too. When we invite you to the event, the email will specify whether we would be able to offer you a place offline. We would really hope to accommodate everyone offline, but your safety and health is our top one priority.",
        folded: true
    },
    {
        question: "How is the hackathon going to take place?",
        answer: "This year Hack Cambridge Atlas is planned as a Hybrid Event with 300 participants offline at Cambridge and 200 participants online through Discord. The workshops and all engagement opportunities will happen offline while being live-streamed on Discord.",
        folded: true
    },
    {
        question: "Do I need a team to apply?",
        answer: "Nope! You are of course welcome to apply in a pre-formed team but some of our hackers will meet their team at the start of the event.",
        folded: true
    },
    {
        question: "How large can the teams be?",
        answer: "To achieve fairness in the event, no more than 4 people can be in a team.",
        folded: true
    },
    {
        question: "I am not from the University of Cambridge. Am I allowed to attend?",
        answer: "Anyone who is currently a registered student or has graduated after 22nd January 2021 is eligible to attend. Sadly we can't accommodate anyone under the age of 18 this year.",
        folded: true
    },
    {
        question: "Is Hack Cambridge Atlas free to attend?",
        answer: "Absolutely! Participation is free for all invited hackers. We provide interesting workshops, entertaining activties, and some swag during the event.",
        folded: true
    },
    {
        question: "What is the Code of Conduct for Hack Cambridge Atlas?",
        answer: `We follow the Code of Conduct from MLH: https://mlh.io/code-of-conduct.`,
        folded: true
    },
    {
        question: "What is your current covid-19 policies if I am attending the event in-person?",
        answer: `Your registration, RSVP, fully-vaccinated status (or exemption) AND a negative result for a Covid-19 test taken within 24 hours of the event entitles you to admittance to the in-person HackCambridge Atlas event. Rather than using COVID Pass, we require a text or email notification of your test from NHS Test and Trace as a condition of entry*.
        Registration opens at 0900 on Saturday the 22nd of January. We require you to have taken a negative PCR or rapid lateral flow test within 24 hours of the event, preferably within 12 hours. As our event is >30 hours long, we will not accept tests taken on Thursday, even if they are within 48 hours of registration. The Government advises that “to strengthen the protection testing provides you should take tests as late as possible before attending the event, ideally within 12 hours”
        Fully-vaccinated status means that you you are vaccinated with 2 doses of an approved vaccine (or one of the single-dose Janssen vaccine). By attending our in-person event you declare that you do meet the criteria outlined above. The vaccines approved in the UK can be found on the government website: https://www.gov.uk/guidance/countries-with-approved-covid-19-vaccination-programmes-and-proof-of-vaccination.
        *If that is not your case or  if you think you are exempt from either or both of our COVID requirements, please email us (team@hackcambridge.com) and we will judge on a case-by-case basis.
        We would require you to prepare at least two sets of lateral flow test kit (one for entering the event venue and one more as a back up in case of emergency/if you leave the venue during the event). We would require the result of LFT to be reported to NHS thus your test kits must be the NHS-approved ones. More details on this will come together with the event invitation. There have been news articles about the shortage of LFTs, thus we would encourage you to prepare the kits in advance - especially if you are arriving in Cambridge very close to the event. You can use the NHS website to find out where to get rapid lateral flow tests.
        `,
        folded: true
    }
];

const pastPhotos = [
    {
        photo: hc2021,
        caption: "Hex Cambridge"
    },
    {
        photo: hc2020_1,
        caption: "Hack Cambridge 101"
    },
    {
        photo: hc2020_2,
        caption: "Hack Cambridge 101"
    },
    {
        photo: hc2019_1,
        caption: "Hack Cambridge 4D"
    },
    {
        photo: hc2019_2,
        caption: "Hack Cambridge 4D"
    },
    {
        photo: hc2019_3,
        caption: "Hack Cambridge 4D"
    },
    {
        photo: hc2018_1,
        caption: "Hack Cambridge Ternary"
    },
    {
        photo: hc2018_2,
        caption: "Hack Cambridge Ternary"
    },
    {
        photo: hc2017,
        caption: "Hack Cambridge Recurse"
    },
    {
        photo: hc2016,
        caption: "Hack Cambridge 2016 -- Where we started"
    }
];

const committeInfo = [
    {
        image: zoey,
        caption: "General Manager",
        title: "Zoey",
        visible: true
    },
    {
        image: khalid,
        caption: "Head of Finance",
        title: "Khalid",
        visible: true
    },
    {
        image: theo,
        caption: "Head of Development",
        title: "Theo",
        visible: true
    },
    {
        image: marcus,
        caption: "Head of Sponsorship",
        title: "Marcus",
        visible: true
    },
    {
        image: komal,
        caption: "Head of Design",
        title: "Komal",
        visible: true
    },
    {
        image: ayush,
        caption: "Head of Int/Ext Coordination",
        title: "Ayush",
        visible: true
    },
    {
        image: rishita,
        caption: "Head of Publicity",
        title: "Rishita",
        visible: true
    },
    {
        image: jonathan,
        caption: "Head of Logistics", 
        title: "Jonathan",
        visible: true
    },
    {
        image: vincent,
        caption: "Sponsorship",
        title: "Vincent",
        visible: true
    },
    {
        image: jacky,
        caption: "Development",
        title: "Jacky",
        visible: true
    },
    {
        image: katrina,
        caption: "Committee",
        title: "Katrina",
        visible: true
    },
    {
        image: xinyu,
        caption: "Sponsorship",
        title: "Xinyu",
        visible: true
    },
    {
        image: holly,
        caption:"Design",
        title: "Holly",
        visible: true
    },
    {
        image:placeHolderLogo,
        caption:"",
        title: "Join Us!",
        visible: true
    }
];

const linkToJoin = 'https://forms.gle/2rNYCxYPBcUXQ7EC8';
const linkToApply = '/apply';

const applicationsOpen = false;

export default function Body(props: BodyProp) {
    return (
        <div className="Body">
            <Landing href={linkToApply} applicationsOpen={applicationsOpen}/>
            <Timeline timelinePhoto={timeline2}/>
            <AboutUs />
            <PastPhotos items={pastPhotos}/>
            <FAQ qs={faqQuestions} />
            <SponsorShowcase sponsors={sponsorShowcaseInfo}/>
            <Sponsors cohost={cohost} tera={tera} giga={giga} mega={mega} kilo={kilo} meal={meal} partners={partners}/>
            {/* <PastHackathons /> */}
            <Committee committeeInfo={committeInfo} linkToJoin={linkToJoin}/>
        </div>
    );
}