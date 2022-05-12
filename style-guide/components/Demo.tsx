import { FC, PropsWithChildren } from "react";

interface IDemoProps {
  title: string;
}

export const Demo: FC<PropsWithChildren<IDemoProps>> = ({ title, children }) => (
  <section css={{ marginBottom: "4rem", marginLeft: "3rem" }}>
    <h3 css={{ fontWeight: 400 }}>{title}</h3>
    {children}
  </section>
);
