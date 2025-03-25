
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Check immediately
    checkMobile();
    
    // Add event listener for resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", checkMobile);
    
    return () => mql.removeEventListener("change", checkMobile);
  }, []);

  return isMobile;
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT);
    };
    
    // Check immediately
    checkTablet();
    
    // Add event listener for resize
    window.addEventListener("resize", checkTablet);
    
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  return isTablet;
}

export function useIsMobileOrTablet() {
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState<boolean>(false);

  React.useEffect(() => {
    const check = () => {
      setIsMobileOrTablet(window.innerWidth < TABLET_BREAKPOINT);
    };
    
    // Check immediately
    check();
    
    // Add event listener for resize
    window.addEventListener("resize", check);
    
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobileOrTablet;
}

export function useResponsiveValue<T>(options: {
  mobile: T;
  tablet?: T;
  desktop: T;
}): T {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  if (isMobile) return options.mobile;
  if (isTablet && options.tablet !== undefined) return options.tablet;
  return options.desktop;
}
