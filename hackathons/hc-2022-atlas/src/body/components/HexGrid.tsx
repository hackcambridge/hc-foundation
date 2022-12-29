import React, { CSSProperties } from "react";
import "./HexGrid.scss";

export type HexGridProps = {
  className?: string;
  info: HexProps[];
  layoutInfo: {
    nHexaBig: number;
    nHexaMed: number;
    nHexaSmall: number;
    baseSize: string;
  };
};

export type HexProps = {
  title: string;
  caption: string;
  image: string;
  visible: boolean;
  href?: string;
};

const Hex = ({ title, caption, image, visible, href }: HexProps) => {
  return (
    <a href={href} style={{ visibility: visible ? "visible" : "hidden" }}>
        <figure>
          <h2>{title}</h2>
          <p>{caption}</p>
        </figure>
        <img alt={`${title}`} src={image} />
    </a>
  );
};

export interface CustomCSSForHexGrid extends CSSProperties {
  "--Nhexa-big": number;
  "--Nhexa-med": number;
  "--Nhexa-small": number;
  "--base-size": string;
}

export default function HexGrid({ className, info, layoutInfo }: HexGridProps) {
  const getStyle = (nHexaBig: number, nHexaMed: number, nHexaSmall: number, baseSize: string) => {
    return {
      "--Nhexa-big": nHexaBig,
      "--Nhexa-med": nHexaMed,
      "--Nhexa-small": nHexaSmall,
      "--base-size": baseSize,
    } as CustomCSSForHexGrid;
  };

  return (
    <div
      className={className ? className + " HexGrid" : "HexGrid"}
      style={getStyle(
        layoutInfo.nHexaBig,
        layoutInfo.nHexaMed,
        layoutInfo.nHexaSmall,
        layoutInfo.baseSize
      )}
    >
      <section>
        {info.map((comInfo, i) => (
          <Hex key={comInfo.caption + i} {...comInfo} />
        ))}
      </section>
    </div>
  );
}
