import bgImage from "../assets/hero-background.jpg";
import { Header } from "./header";
import { Middle } from "./middle";

export function Hero() {
  return (
    <div
      className={`hero bg-[url('/hero-background.jpg')] w-full border h-full object-center overflow-hidden`}
    >
      <div className="absolute bg-neutral-900/80 inset-0"></div>
      <div className="absolute -z-10 bg-linear-to-b from-0% to-100% from-neutral-800  inset-x-0 h-32"></div>
      <Header />
      <div className="h-full w-full -z-10 ">
        <Middle />
        <div className="absolute z-0 inset-0 bg-linear-to-t from-neutral-900 from-0%"></div>
      </div>
    </div>
  );
}
