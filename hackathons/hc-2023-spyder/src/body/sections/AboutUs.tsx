import React from "react";
import "./AboutUs.scss";
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
                Greetings from Hack Cambridge!
                We know that you are as excited as we are about the upcoming event.
                <br></br>
                The largest student-run hackathon in Cambridge is back for its 8th season in March 2023.
                <br></br>
                Hack Cambridge Spyder is incredible opportunity for you to explore all possibilities in a sprint-like event.
                <br></br>
                Come with your team to hack together for 24 hours,
                talk to recruiters from our sponsors and enjoy the workshops!
                <br></br>
                We hope to bring keen, ambitious and talented
                students together and create original
                solutions for social good.
                <br></br>
                Together with your energy, creativity,
                hacker spirit, we hope to empower a better, more sustainable future.
                <br></br>
                We look forward to meeting you at Hack Cambridge Spyder!
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
