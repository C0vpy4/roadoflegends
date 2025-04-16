import { About, Form, Main, ProgrammTours, Tours } from "./components";
import { ScrollButton } from "./components";
import { Analytics } from "@vercel/analytics/react";
export default function Home() {
  return (
    <div className="min-h-fit flex items-center justify-center flex-col relative">
      {/* Плавающая кнопка прокрутки */}
      <ScrollButton />

      {/* Секции с уникальными ID для прокрутки */}
      <div id="main-section" className="w-full min-h-screen">
        <Main />
      </div>

      <div id="about-section" className="w-full min-h-screen">
        <About />
      </div>

      <div id="tours-section" className="w-full min-h-screen">
        <Tours />
      </div>

      <div id="programm-tours-section" className="w-full min-h-screen">
        <ProgrammTours />
      </div>

      <div id="form-section" className="w-full min-h-screen">
        <Form />
      </div>
      <Analytics />
    </div>
  );
}
