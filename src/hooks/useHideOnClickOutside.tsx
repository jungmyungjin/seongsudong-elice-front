import { useEffect, useRef } from 'react';

const useHideOnClickOutside = (
  callback: () => void,
  ignoreRef?: React.RefObject<HTMLElement>,
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      (!ignoreRef?.current || !ignoreRef.current.contains(event.target as Node))
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [callback]);

  return { ref };
};

export default useHideOnClickOutside;
