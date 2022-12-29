import React, { MouseEventHandler } from "react";
import "./FAQTextBox.scss";
import { Collapse } from "react-collapse";
// import { Transition } from "react-transition-group";
import { Fade } from "react-reveal";
//import Collapse from 'react-bootstrap/Collapse';

export type FAQTextBoxProps = {
  question: string;
  answer: string;
  folded: boolean;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
};

// const theme = {
//   collapse: "ReactCollapse--collapse",
//   content: "ReactCollapse--content",
// };

export default function FAQTextBox({
  question,
  answer,
  folded,
  onButtonClick,
}: FAQTextBoxProps) {
  return (
    <Fade right>
      <div className="FAQTextBox">
        <button className="FAQ-button" onClick={onButtonClick}>
          <p>{question}</p>
        </button>
        <Collapse isOpened={!folded}>
          <div className="text">
          {answer.split('\n').map((line => <div>{line}</div>))}
            {/* <div>{answer}</div> */}
          </div>
        </Collapse>
      </div>
    </Fade>
  );
}

/*
<div>
        <div className="config">
          <label className="label">
            Opened:
            <input
              className="input"
              type="checkbox"
              checked={isOpened}
              onChange={({target: {checked}}) => this.setState({isOpened: checked})} />
          </label>

          <label className="label">
            Paragraphs:
            <input
              className="input"
              type="range"
              value={paragraphs}
              step={1}
              min={0}
              max={4}
              onChange={({target: {value}}) => this.setState({paragraphs: parseInt(value, 10)})} />
            {paragraphs}
          </label>
        </div>

        <Collapse isOpened={isOpened}>
          <div className="text">
            {paragraphs ? getText(paragraphs) : <p>No text</p>}
          </div>
        </Collapse>
      </div>
*/
