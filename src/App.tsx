import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// The product page is a separate, rarely visited route; keep it out of the main bundle.
const Vendpilot = lazy(() => import("./pages/vendpilot"));

const App = () => (
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vendpilot" element={<Vendpilot />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </MotionConfig>
);

export default App;
