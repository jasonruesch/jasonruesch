import { useEffect, useState } from 'react';

export const useScrollable = () => {
  const [scrollable, setScrollable] = useState(
    document.body.clientHeight > document.documentElement.clientHeight,
  );

  useEffect(() => {
    const handleResize = () => {
      setScrollable(
        document.body.clientHeight > document.documentElement.clientHeight,
      );
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return scrollable;
};
