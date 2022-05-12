import { startsWith, sortBy } from "lodash";

const req = (require as any).context("../examples", true, /.*.tsx$/);

const paths = req.keys().filter((key: string) => !startsWith(key, "examples/"));

const config: any[] = paths.map((key: string, idx: string) => {
  const { Example, config } = req(key);
  return {
    path: config.path || `${key.split(".")[1]}`,
    element: <Example key={idx} />,
    label: config.label,
    order: config.order,
  };
});

export const routesConfig = sortBy(config, (o) => o.order);
