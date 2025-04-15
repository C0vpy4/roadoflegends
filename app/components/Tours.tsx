import React from "react";
import { ComponentUI } from "../ui";
import { SameText, TitleText } from "../shared";
import { CardTour } from "./widgets";

export const Tours = () => {
  return (
    <ComponentUI className="justify-start items-start px-4 sm:px-8 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 lg:pt-30 pb-3 sm:pb-4 md:pb-5 gap-6 sm:gap-8 md:gap-10 flex-col">
      <div className="w-full">
        <TitleText text="Программы" />
        <SameText text="Нам есть, что вам предложить, пожалуйста, выберите тур:" />
      </div>

      <div className="w-full flex items-center justify-center sm:justify-around flex-col sm:flex-row gap-8 sm:gap-6 md:gap-8 lg:gap-10 flex-wrap">
        <CardTour text="1" sameText="ТУР" imageSrc="/tour1.png" />
        <CardTour text="2" sameText="ТУР" imageSrc="/tour2.png" />
      </div>
    </ComponentUI>
  );
};
