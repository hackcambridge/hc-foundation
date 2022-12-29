import "./FAQ.scss";
import FAQTextBox from "../components/FAQTextBox";
import React, { useState } from "react";
import Fade from "react-reveal";

export type FAQProps = {
  qs: { question: string; answer: string }[];
};

export default function FAQ({ qs }: FAQProps) {
  const [openQuestion, setOpenQuestion] = useState(-1);
  return (
    <div className="FAQ" id="faq">
      <div className="faq-col-3">
        <Fade center>
          <h1>FAQs</h1>
        </Fade>
        {qs.map((qObject, i) =>
          i === openQuestion ? (
            <div key={qObject.question} className={i % 2 === 1 ? "faq-col-3-1" : "faq-col-3-2"}>
                <FAQTextBox
                  key={qObject.question}
                  {...qObject}
                  folded={false}
                  onButtonClick={
                    // Event handler for when FAQ text box is unfolded
                    (e) => {
                      e.preventDefault();
                      setOpenQuestion(-1);
                    }
                  }
                />
            </div>
          ) : (
            <div key={qObject.question} className={i % 2 === 1 ? "faq-col-3-1" : "faq-col-3-2"}>
                <FAQTextBox
                  key={qObject.question}
                  {...qObject}
                  folded={true}
                  onButtonClick={
                    // Event handler for when FAQ text box is folded
                    (e) => {
                      e.preventDefault();
                      setOpenQuestion(i);
                    }
                  }
                />
            </div>
          )
        )}
      </div>
    </div>
  );
}
