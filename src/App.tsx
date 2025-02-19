import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import splashDark from "./assets/logo-dark.svg";
import splashLight from "./assets/logo-light.svg";

function App() {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  const isDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const [isSplashVisible, setIsSplashVisible] = useState(isStandalone);

  useEffect(() => {
    if (isStandalone) {
      // Hide the splash screen after 2.3 seconds
      const timer = setTimeout(() => {
        setIsSplashVisible(false);
      }, 2300);

      return () => clearTimeout(timer);
    }
  }, [isStandalone]);

  return (
    <>
      <div className="grid h-dvh place-content-center">
        <h1 className="text-4xl font-bold">Jason Ruesch</h1>
        {/* <Incrementor /> */}
      </div>

      {/* Splash Screen */}
      <Transition as={Fragment} show={isSplashVisible}>
        <div className="fixed inset-0 grid place-items-center bg-neutral-100 p-10 transition ease-out data-[leave]:opacity-0 data-[leave]:duration-700 dark:bg-neutral-900">
          <img
            src={isDarkScheme ? splashDark : splashLight}
            alt="Splash Screen"
            className="h-full max-h-[calc(100dvh-80px)] md:max-h-[calc(50dvh-80px)]"
          />
        </div>
      </Transition>
    </>
  );
}

// const Incrementor = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <div className="mt-4 flex flex-col items-center">
//       <p className="text-xl">Count: {count}</p>
//       <button
//         className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//         onClick={() => setCount(count + 1)}
//       >
//         Increment
//       </button>
//     </div>
//   );
// };

export default App;
