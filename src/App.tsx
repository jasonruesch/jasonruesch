import { Transition } from "@headlessui/react";
import { Fragment, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import { StandaloneSplashScreen } from "./components";

const Home = lazy(() => import("./pages/home"));

const App = () => {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
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
      <Transition as={Fragment} show={isSplashVisible}>
        <StandaloneSplashScreen />
      </Transition>

      <Transition as={Fragment} show={!isSplashVisible}>
        <div className="grid h-dvh place-content-center">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Transition>
    </>
  );
};

export default App;
