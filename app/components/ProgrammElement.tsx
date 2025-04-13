import React from "react";
import { SameText, TitleText } from "../shared";

interface ProgrammProps {
  text: string;
  about: [];
}

export const ProgrammElement = ({ text, about }: ProgrammProps) => {
  return (
    <div>
      <TitleText text="Программа" />
      <SameText text={text} />
      <div className="">
        {about.map((item, index) => (
          <div key={index}>{JSON.stringify(item)}</div>
        ))}
      </div>
    </div>
  );
};
