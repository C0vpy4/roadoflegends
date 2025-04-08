import { component$ } from "@builder.io/qwik";
import { Button } from "~/shared";
import { MotionDiv } from "../motion";

export const Main = component$(() => {
  return (
    <MotionDiv
      class="text-center text-white min-h-screen flex flex-col justify-center items-center w-full gap-20 z-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 class="flex flex-wrap justify-center w-[64%]">
        Тур поездки по Дагестану
      </h1>
      <Button text="Начать поездку" class="w-[300px]" />
    </MotionDiv>
  );
});
