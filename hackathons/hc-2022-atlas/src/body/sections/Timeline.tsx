import React from "react";
import "./Timeline.scss";
import { Fade } from "react-reveal";

export type TimelineProps = {
  timelinePhoto: string;
};

export default function Timeline({ timelinePhoto }: TimelineProps) {
  return (
    <Fade down>
      <div className="Timeline">
        <h1>Where to start..</h1>
        <div className="Timeline__image">
          <img src={timelinePhoto} alt="Timeline" />
        </div>
      </div>
    </Fade>
  );
}
