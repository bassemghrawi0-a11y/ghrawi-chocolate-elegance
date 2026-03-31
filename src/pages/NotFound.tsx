import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 font-display text-[56px] font-light text-foreground">404</h1>
        <p className="mb-6 font-body text-sm font-light text-text-muted-warm">Page not found</p>
        <a
          href="/"
          className="font-body text-[11px] font-normal tracking-[0.18em] uppercase text-accent hover:text-foreground transition-colors duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
