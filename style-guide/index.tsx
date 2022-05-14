import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { getRouterRoutes } from "./getRouterRoutes";
import { routesConfig } from "./getRoutesConfig";
import { ThemeContext } from "./ThemeContext";
import { css, Global } from "@emotion/react";
import { useState } from "react";
import { createRoot } from "react-dom/client";

const containerStyles = css({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  // display: "flex",
});

const mainStyles = css({
  padding: "1rem",
  // flex: 1,
  overflow: "scroll",
});

const App = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <Router>
      <div css={containerStyles}>
        <Global
          styles={css`
            html {
              font-size: 14px;
            }
            body {
              font-family: "Roboto", "Helvetica", "Arial", sans-serif;
              font-size: 1.4rem;
            }
          `}
        />
        <ThemeContext.Provider
          value={{
            theme: theme,
            toggleTheme: () => {
              setTheme(theme === "light" ? "dark" : "light");
            },
          }}
        >
          <Nav routesConfig={routesConfig} />
        </ThemeContext.Provider>
        <main css={mainStyles}>
          <Routes>{getRouterRoutes(routesConfig)}</Routes>
        </main>
      </div>
    </Router>
  );
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
