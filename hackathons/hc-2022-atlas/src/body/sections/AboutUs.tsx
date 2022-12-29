import React from "react";
import "./AboutUs.scss";
import cone from "../../shared/img/cone.png";
import donut from "../../shared/img/donut.png";
import sphere from "../../shared/img/sphere.png";
import lightbulb from "../../shared/img/001-idea.svg";
import uniofcam from "../../shared/img/uni_cam_white.png";
import { ScrollRotate } from "react-scroll-rotate";
import Fade from "react-reveal";

export type AboutUsProps = {};

export default function AboutUs(props: AboutUsProps) {
  return (
    <div className={"AboutUs"} id="about-us">
      <div className="about-us-col about-us-col-1">
        <Fade left>
          <h1>Join us</h1>
          <h2>to make a difference</h2>
        </Fade>
        <Fade bottom>
          <div className="about-us-with-dec">
            <div className="about-us-with-dec-col-1">
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Greetings from
                Hack Cambridge! We know that you are as excited as we are about
                the upcoming event.
                <br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As the 7th season of the largest
                student-run hackathon in Cambridge, Hack Cambridge Atlas is an
                incredible opportunity for you to explore all possibilities in a
                sprint-like event. Come with your team to hack
                together for 24 hours, talk to recruiters from our sponsors and enjoy the
                workshops!
                <br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Hack Cambridge Atlas hopes to bring keen, ambitious and talented
                university students together and create original and innovative
                solutions for social good. Together with your energy, creativity, hacker spirit, 
                we hope to empower a better, more sustainable future.
                <br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                We look forward to meeting you at Hack Cambridge Atlas (Jan 22)!
              </p>
              <ScrollRotate loops={-0.5} method={"perc"} from={10}>
                <img
                  src={cone}
                  alt=""
                  id="about-us-cone"
                  className="about-us-dec"
                />
              </ScrollRotate>
            </div>
            <div className="about-us-with-dec-col-2">
              <ScrollRotate loops={1} method={"perc"} from={-45}>
                <img
                  src={donut}
                  alt=""
                  id="about-us-donut"
                  className="about-us-dec"
                />
              </ScrollRotate>
              <ScrollRotate loops={0.5} method={"perc"} from={-45}>
                <img
                  src={sphere}
                  alt=""
                  id="about-us-sphere"
                  className="about-us-dec"
                />
              </ScrollRotate>
            </div>
          </div>
        </Fade>
      </div>
      <Fade right>
        <div className="about-us-col about-us-col-2">
          <ScrollRotate loops={0.5} method={"perc"} from={-45}>
            <img src={lightbulb} alt="" />
          </ScrollRotate>
          <img src={uniofcam} alt="" />
        </div>
      </Fade>
    </div>
  );
}
