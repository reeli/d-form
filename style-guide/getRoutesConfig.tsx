import { startsWith } from "lodash";

const req = (require as any).context("../examples", true, /.*.tsx$/);

const paths = req.keys().filter((key: string) => !startsWith(key, "examples/"));

export const routesConfig: any[] = paths.map((key: string, idx: string) => {
  const { Example, config } = req(key);

  return {
    path: config.path || `${key.split(".")[1]}`,
    element: <Example key={idx} />,
    label: config.label
  };
});
