import React from "react";
import { ComponentUI } from "../ui";
import { SameText, TitleText } from "../shared";
import { CardTour } from "./widgets";
export const Tours = () => {
  return (
    <ComponentUI className="justify-start items-start px-20 pt-30 pb-5 gap-10 flex-col">
      <div className="">
        <TitleText text="Программы" />
        <SameText text="Нам есть, что вам предложить, пожалуйста, выберите тур:" />
      </div>

      <div className="w-full flex items-center justify-around gap-10">
        <CardTour text="1" sameText="ТУР" imageSrc="/tour1.png" />
        <CardTour text="2" sameText="ТУР" imageSrc="/tour2.png" />
      </div>
    </ComponentUI>
  );
};
