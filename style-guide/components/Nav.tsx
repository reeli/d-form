import { map } from "lodash";
import { Link, RouteProps, useLocation } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { css } from "@emotion/react";

const navItemStyles = css({
  fontSize: "1.4rem",
  color: "#222",
  display: "block",
  margin: "0.5rem 0",
});

const asideStyles = css({
  opacity: 0.7,
  overflowY: "scroll",
});

const linkStyles = css({
  color: "#fff",
  padding: "0.5rem 1rem",
});

const getActiveLinkStyles = (theme: string) => ({
  background: theme === "dark" ? "#545659" : "#e07070",
});

export const Nav = ({ routesConfig }: { routesConfig: RouteProps[] }) => {
  const location = useLocation();
  const groups = [
    {
      name: "d-form",
      display: "D-Form",
      routes: routesConfig,
    },
  ];

  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <aside css={[{ background: theme === "dark" ? "#000" : "red" }, asideStyles]}>
          <div
            onClick={() => toggleTheme()}
            css={[
              navItemStyles,
              {
                color: "#fff",
                cursor: "pointer",
                textAlign: "right",
                paddingRight: "1rem",
              },
            ]}
          >
            Toggle Theme
          </div>
          {map(groups, (group, idx) => (
            <section key={idx}>
              <p
                css={{
                  color: "#fff",
                  paddingLeft: "0.5rem",
                }}
              >
                {group.display}
              </p>
              <div css={{ display: "flex" }}>
                {map(group.routes, (routeConfig: any, key: number) => (
                  <Link
                    to={routeConfig.path}
                    key={key}
                    css={css([
                      navItemStyles,
                      linkStyles,
                      {
                        ":hover,:focus": getActiveLinkStyles(theme),
                      },
                      routeConfig.path === location.pathname ? getActiveLinkStyles(theme) : {},
                    ])}
                  >
                    {routeConfig.label || routeConfig.path.split("/")[1]}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </aside>
      )}
    </ThemeContext.Consumer>
  );
};
