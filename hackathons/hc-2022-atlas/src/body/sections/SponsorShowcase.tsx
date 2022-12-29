import React from "react";
import "./SponsorShowcase.scss";
import Slider from "react-slick";
import { useState } from "react";
import { useWindowResize } from "../../shared/util/useWindowResize";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Fade from 'react-reveal';

export type SponsorShowcaseInfo = {
  sponsor: string;
  logo: string;
  text: string;
  videoLink?: string;
  isPlaceHolder?: boolean;
  logoMinHeight?: string;
  videoElement?: ({className, width, height}:{className:string, width:string, height: string})=>JSX.Element
};
export type SponsorShowcaseProps = {
  sponsors: SponsorShowcaseInfo[];
};

const PrevArrow = (props: any) => {
  return (
    <div className={"prev-arrow arrow"} onClick={props.onClick}>
      <AiOutlineLeft color={"white"}/>
    </div>
  );
};

const NextArrow = (props: any) => {
  return (
    <div className={"next-arrow arrow"} onClick={props.onClick}>
      <AiOutlineRight color={"white"}/>
    </div>
  );
};

export function SponsorShowcaseCard({
  sponsor,
  isCurrent,
}: {
  sponsor: SponsorShowcaseInfo;
  isCurrent: boolean;
}) {
  return (
    <div className={"SponsorShowcaseCard"} id="sponsor-showcase">
      <div className={isCurrent && !sponsor.isPlaceHolder?"sponsor-logo-active sponsor-logo":"sponsor-logo"} style={{ backgroundImage: `url(${sponsor.logo})`, minHeight: sponsor.logoMinHeight }}></div>
      {isCurrent && sponsor.videoLink && <video src={sponsor.videoLink} preload="auto" controls style={{width: "100%", height: "auto"}} ></video>}
      {isCurrent && sponsor.videoElement && <sponsor.videoElement className={"customVideo"} width="100%" height="auto"/>}
      {isCurrent && <p style={ sponsor.videoLink || sponsor.videoElement?{fontSize: 'small'}:{}}>{sponsor.text}</p>}
    </div>
  );
}

export default function SponsorShowcase({ sponsors }: SponsorShowcaseProps) {
  // eslint-disable-next-line
  const { width, height } = useWindowResize();
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <Fade top>
    <div className="SponsorShowcase">
      {/* <h1>Sponsor Showcase</h1> */}
      <h1>Our Sponsors</h1>
      <div className="slider-container">
        <Slider
          slidesToShow={width < 600 ? 1 : 3}
          centerMode={true}
          centerPadding={"0"}
          initialSlide={0}
          beforeChange={(current, next) => setImgIdx(next)}
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          {sponsors.map((sponsor, idx) => (
            <div key={idx} className={idx === imgIdx ? "slide active-slide" : "slide"}>
              <SponsorShowcaseCard
                sponsor={sponsor}
                isCurrent={idx === imgIdx}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
    </Fade>
  );
}
