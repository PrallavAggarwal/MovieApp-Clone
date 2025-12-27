import { NetflixLogo } from "../assets/netflixLogo";

export function PageLoader() {
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <NetflixLogo className={"animate-pulse size-56"} />
    </div>
  );
}
