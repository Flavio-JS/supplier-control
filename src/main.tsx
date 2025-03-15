import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme-context.tsx";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <StyledThemeProvider theme={lightTheme}>
        <App />
      </StyledThemeProvider>
    </ThemeProvider>
  </StrictMode>
);
