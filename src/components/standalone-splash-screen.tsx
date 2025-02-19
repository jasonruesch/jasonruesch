import splashDark from "../assets/logo-dark.svg";
import splashLight from "../assets/logo-light.svg";

export type StandaloneSplashScreenProps = {
  ref?: React.RefObject<HTMLDivElement>;
};

export const StandaloneSplashScreen = ({
  ref,
}: StandaloneSplashScreenProps) => {
  const isDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  return (
    <div
      ref={ref}
      className="fixed inset-0 grid place-items-center bg-neutral-100 p-10 transition ease-out data-[leave]:opacity-0 data-[leave]:duration-700 dark:bg-neutral-900"
    >
      <img
        src={isDarkScheme ? splashDark : splashLight}
        alt="Splash Screen"
        className="h-full max-h-[calc(100dvh-80px)] md:max-h-[calc(50dvh-80px)]"
      />
    </div>
  );
};
