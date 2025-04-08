import React from "react";
import { Background } from "../shared";

interface ComponentUIProps {
  children: React.ReactNode;
  className?: string; // Добавляем опциональное свойство для стилей
  style?: React.CSSProperties; // Добавляем опциональное свойство для инлайн-стилей
}

export const ComponentUI: React.FC<ComponentUIProps> = ({
  children,
  className = "", // Значение по умолчанию - пустая строка
  style = {}, // Значение по умолчанию - пустой объект
}) => {
  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center  ${className}`}
      style={style}
    >
      {children}
      <Background imageSrc="/image 17.png" alt="Background" />
    </div>
  );
};
