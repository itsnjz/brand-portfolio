"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
  ReactNode,
} from "react";
import Lenis from "@studio-freight/lenis";
import debounce from "@/util/debounce";

interface PageContextType {
  lenis: Lenis | null;
}

const PageContext = createContext<PageContextType>({
  lenis: null,
});

interface PageProviderProps {
  children: ReactNode;
}

interface LenisConfig {
  duration?: number;
  easing?: (t: number) => number;
  direction?: string;
  gestureDirection?: string;
  smooth?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
}

export const PageProvider = ({ children }: PageProviderProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reqIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = (time: number) => {
      lenis?.raf(time);
      reqIdRef.current = requestAnimationFrame(animate);
    };
    reqIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
      }
    };
  }, [lenis]);

  useLayoutEffect(() => {
    const lenisConfig: LenisConfig = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    };

    const lenis = new Lenis(
      lenisConfig as ConstructorParameters<typeof Lenis>[0]
    );

    let lastHeight = 0;
    let hideNav = false;
    let isScrolled = false;

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      debounce(() => (lastHeight = scroll))();

      if (lastHeight < scroll && scroll > 160 && !hideNav) {
        document.body.classList.add("hide_header");
        hideNav = true;
      }
      if (lastHeight >= scroll && scroll > 160 && hideNav) {
        document.body.classList.remove("hide_header");
        hideNav = false;
      }

      if (lastHeight < scroll && scroll > 220 && !isScrolled) {
        document.body.classList.add("scrolled");
        isScrolled = true;
      }

      if (lastHeight >= scroll && scroll < 220 && isScrolled) {
        document.body.classList.remove("scrolled");
        isScrolled = false;
      }
    });
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  const memoedValue = useMemo(
    () => ({
      lenis,
    }),
    [lenis]
  );

  return (
    <PageContext.Provider value={memoedValue}>{children}</PageContext.Provider>
  );
};

export default function usePage(): PageContextType {
  return useContext(PageContext);
}
