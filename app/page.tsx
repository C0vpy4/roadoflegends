import { About, Main, Tours } from "./components";

export default function Home() {
  return (
    <div className="min-h-fit flex items-center justify-center flex-col">
      <Main />
      <About />
      <Tours />
    </div>
  );
}
