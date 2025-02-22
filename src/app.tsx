import clsx from "clsx";
import { lazy } from "react";
import { Route, Routes, ScrollRestoration } from "react-router";

import { Footer, Header, SplashScreen } from "./components";

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Articles = lazy(() => import("./pages/articles"));
const Projects = lazy(() => import("./pages/projects"));
const Speaking = lazy(() => import("./pages/speaking"));
const Uses = lazy(() => import("./pages/uses"));
const ThankYou = lazy(() => import("./pages/thank-you"));

const App = () => {
  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 flex h-dvh justify-center",
          "sm:pr-[calc(env(safe-area-inset-right)+(--spacing(8)))] sm:pl-[calc(env(safe-area-inset-left)+(--spacing(8)))]",
        )}
      >
        <div
          className={clsx(
            "flex w-full",
            "max-w-[calc(var(--container-7xl)-env(safe-area-inset-right)-env(safe-area-inset-left))]",
            "lg:pr-[calc(env(safe-area-inset-right)+(--spacing(8)))] lg:pl-[calc(env(safe-area-inset-left)+(--spacing(8)))]",
          )}
        >
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>

      <div
        className={clsx(
          "relative flex min-h-dvh flex-col",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
        )}
      >
        <Header />
        <main id="main" className="grow">
          <ScrollRestoration />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/uses" element={<Uses />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <SplashScreen />
    </>
  );
};

export default App;
