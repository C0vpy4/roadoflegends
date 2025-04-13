import { About, Form, Main, ProgrammTours, Tours } from "./components";

export default function Home() {
  return (
    <div className="min-h-fit flex items-center justify-center flex-col">
      <Main />
      <About />
      <Tours />
      <ProgrammTours />
      <Form />
    </div>
  );
}
