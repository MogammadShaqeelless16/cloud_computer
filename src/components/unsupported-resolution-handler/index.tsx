import { MINIMUM_APP_HEIGHT, MINIMUM_APP_WIDTH } from "@/utils/app-settings";
import { type PropsWithChildren, useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const UnsupportedResolutionHandler = ({
  children,
}: PropsWithChildren) => {
  const [windowDimensions, setWindowDimensions] = useState(() =>
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      const dimensions = getWindowDimensions();
      const body = document.body;

      if (
        dimensions.width < MINIMUM_APP_WIDTH ||
        dimensions.height < MINIMUM_APP_HEIGHT
      ) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "unset";
      }

      setWindowDimensions(dimensions);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSupported =
    windowDimensions.width >= MINIMUM_APP_WIDTH &&
    windowDimensions.height >= MINIMUM_APP_HEIGHT;

  return (
    <>
      {children}
    </>
  );
};
