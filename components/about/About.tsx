import { component$ } from "@builder.io/qwik";
import { Button } from "~/shared";
import { MotionDiv, MotionH1 } from "../motion";

export const About = component$(() => {
  return (
    <MotionDiv
      class="text-center text-white min-h-screen flex flex-col justify-center items-center w-full gap-8 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MotionH1
        class="text-[80px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        О нас
      </MotionH1>

      <MotionDiv
        class="text-xl max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p>
          Мы организуем незабываемые туры по Дагестану, показывая самые красивые
          и интересные места этого удивительного региона.
        </p>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button text="Вернуться назад" class="w-[300px]" />
      </MotionDiv>
    </MotionDiv>
  );
});
