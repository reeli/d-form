import { Widget } from "./types";
import { Field } from "./Field";
import { Fragment } from "react";

interface FieldListProps {
  widgets: Widget[];
}

const renderFieldList = (widgets: Widget[]) => {
  return (
    <Fragment>
      {widgets.map((widget, idx) => {
        if (widget.type === "array") {
          // TODO
          return <div key={idx}>array</div>;
        }

        if (widget.type === "group") {
          return (
            <div key={idx} css={{ padding: 10, marginBottom: 25 }}>
              <h3>{widget.section.title}</h3>
              <div>{renderFieldList(widget.section.widgets)}</div>
            </div>
          );
        }

        return <Field {...widget} key={idx} />;
      })}
    </Fragment>
  );
};

export const FieldList = ({ widgets }: FieldListProps) => {
  return renderFieldList(widgets);
};
