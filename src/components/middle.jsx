import { useNavigate } from "react-router-dom";

export function Middle() {
  const navigate = useNavigate();

  return (
    <div className="relative z-10  flex flex-col items-center justify-center h-[80%] px-4 text-center max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight text-white drop-shadow-2xl w-4/5">
        Unlimited movies, TV shows, and more
      </h1>
      <p className="text-lg md:text-2xl mb-6 font-medium text-white">
        Watch anywhere. Cancel anytime.
      </p>
      <p className="text-sm w-4/5 font-semibold md:text-xl mb-8 text-white">
        Ready to watch? Enter your email to create or restart your membership.
      </p>

      <form
        className="flex flex-col text-white md:flex-row gap-2 w-full max-w-2xl px-4"
        onSubmit={(e) => {
          e.preventDefault();
          let passedemail = e.target[0].value;
          let url = "/signup/" + encodeURIComponent(passedemail);
          navigate(url);
        }}
      >
        <input
          type="email"
          placeholder="Email address"
          className="flex-grow bg-black/90 border border-zinc-500 rounded-md px-4 py-4 text-lg focus:ring-2 ring-white outline-none"
        />
        <button className="bg-red-600 hover:bg-red-700 transition-colors text-white px-8 py-3 rounded-md text-xl md:text-2xl font-bold flex items-center justify-center gap-2 whitespace-nowrap shadow-lg">
          Get Started
        </button>
      </form>
    </div>
  );
}
