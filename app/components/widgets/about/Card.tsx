import React from "react";

import Image from "next/image";

interface CardProps {
  text: string;
  imageSrc: string;
}
export const Card = ({ text, imageSrc }: CardProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image
        src={imageSrc}
        alt={text}
        width={"157"}
        height={"157"}
        className="object-cover"
      />
      <p className="text-center justify-center text-white/80 text-lg font-medium font-['Gilroy']">
        {text}
      </p>
    </div>
  );
};
