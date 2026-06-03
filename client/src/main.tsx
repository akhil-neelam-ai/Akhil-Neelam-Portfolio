import { createRoot } from "react-dom/client";
import App from "./App";
import { initFadeInObserver } from "./lib/init-fade-in";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

requestAnimationFrame(() => initFadeInObserver());
