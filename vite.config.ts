import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { execSync } from "child_process";
import { componentTagger } from "lovable-tagger";
import { endpoints } from "./src/content/resume";

// Serves every section of the resume as a real JSON endpoint:
// /api/index.json, /api/resume.json and /api/<section>.json.
function resumeApi(): Plugin {
  const files: Record<string, unknown> = {
    index: {
      endpoints: Object.keys(endpoints).map((name) => `/api/${name}.json`),
      full: "/api/resume.json",
    },
    resume: endpoints,
    ...endpoints,
  };
  const body = (name: string) => JSON.stringify(files[name], null, 2);

  return {
    name: "resume-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/api\/([a-z]+)\.json(?:\?.*)?$/);
        if (!match || !(match[1] in files)) return next();
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(body(match[1]));
      });
    },
    generateBundle() {
      for (const name of Object.keys(files)) {
        this.emitFile({ type: "asset", fileName: `api/${name}.json`, source: body(name) });
      }
    },
  };
}

function commitSha() {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __COMMIT__: JSON.stringify(commitSha()),
  },
  plugins: [react(), resumeApi(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
