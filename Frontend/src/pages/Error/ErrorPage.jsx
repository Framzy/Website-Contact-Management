import { Link } from "react-router";
import Lottie from "lottie-react";
import animation401 from "../../assets/lotties/401.json";
import animation404 from "../../assets/lotties/404.json";
import animation500 from "../../assets/lotties/500.json";

import "../../styles/index.css";

export default function ErrorPage({
  code = "404",
  title = "Page Not Found",
  message = "The page you are looking for doesn't exist or has been moved.",
  buttonText = "Dashboard",
  buttonLink = "/",
}) {
  const animationMap = {
    401: animation401,
    404: animation404,
    500: animation500,
  };

  const colorPallete = {
    401: "text-yellow-400",
    404: "text-blue-500",
    500: "text-red-500",
  };

  const animation = animationMap[code] || animation404;
  const colorClass = colorPallete[code] || "text-gray-500";

  return (
    <main
      className="error-page container mx-auto px-4 flex items-center justify-center min-h-screen min-w-screen bg-gray-400"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-lg border border-gray-700 overflow-hidden max-w-4xl p-8 text-center animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          {animation ? (
            <Lottie animationData={animation} loop autoplay />
          ) : (
            <img
              src={`/images/errors/img-${code}.png`}
              alt={`Error ${code} illustration`}
              className="w-64 h-64 mt-6"
            />
          )}

          <h2 className={`error-title font-semibold ${colorClass}`}>{title}</h2>
          <p className="error-message text-gray-300 max-w-md">{message}</p>

          <Link
            to={buttonLink}
            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium shadow-md transform hover:-translate-y-0.5"
          >
            <i className="fas fa-home mr-2" />
            <p className="text-sm md:text-lg">Back to {buttonText}</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
