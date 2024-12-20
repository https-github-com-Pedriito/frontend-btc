import { Link } from "react-router-dom"; // Importez Link
import precommande_img from "../assets/precommande.jpg"; //
import { Button } from "react-scroll";
const PreOrderAd = () => {
  return (
    <div className="bg-black">
      <div className="py-24 mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8">
        <div className="relative px-6 pt-16 overflow-hidden bg-black shadow-2xl isolate sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#16B93F15-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#287A2DFF" />
                <stop offset={60} stopColor="#000000FF" />
              </radialGradient>
            </defs>
          </svg>
          <div className="max-w-md mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-green-600 sm:text-4xl">
              Pré-commandez <span className="text-white">&</span>
            </h2>
            <br />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Réservez votre table
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              En deux clics votre pré-commande est prête et votre table
              réservée. Profitez de votre repas sans attendre.
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6 lg:justify-start">
              <Link
                // to="/preOrder"
                className="rounded-full bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-md shadow-white hover:bg-gray-100 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Pré-commander
              </Link>
              <Link
                // to="/OrderPage"
                className="rounded-full bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-md shadow-white hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Réserver une table
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8 object">
            <img
              alt="App screenshot"
              src={precommande_img}
              width={1824}
              height={1080}
              className="object-cover w-[37rem] h-auto max-w-none rounded-lg shadow-sm bg-white/5 ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrderAd;
