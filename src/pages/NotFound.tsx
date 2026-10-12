import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { highlightJson } from "@/components/site/json";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const body = JSON.stringify({ error: "not_found", path: location.pathname, hint: "try GET /" }, null, 2);

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md">
        <p className="font-serif text-7xl leading-none tracking-tight sm:text-8xl">
          Nothing <em>here</em>.
        </p>
        <pre className="mt-8 overflow-x-auto rounded-xl border bg-card px-4 py-3 font-mono text-[12.5px] leading-relaxed text-muted-foreground">
          <span className="text-signal-ink">GET</span> {location.pathname}
          {"\n"}
          <span className="text-destructive">HTTP/1.1 404 Not Found</span>
          {"\n\n"}
          {highlightJson(body)}
        </pre>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
