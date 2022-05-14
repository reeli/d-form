import { Widget } from "./types";
import { Field } from "./Field";

interface FieldListProps {
  widgets: Widget[];
}

const renderFieldList = (widgets: Widget[]) => {
  return (
    <div css={{ marginTop: 25 }}>
      {widgets.map((widget, idx) => {
        if (widget.type === "array") {
          // TODO
          return <div key={idx}>array</div>;
        }

        if (widget.type === "group") {
          return (
            <div key={idx} css={{ padding: 10, marginBottom: 25 }}>
              <h4 css={{ margin: 0, color: "#555" }}>{widget.section.title}</h4>
              <div>{renderFieldList(widget.section.widgets)}</div>
            </div>
          );
        }

        return <Field {...widget} key={idx} />;
      })}
    </div>
  );
};

export const FieldList = ({ widgets }: FieldListProps) => {
  return renderFieldList(widgets);
};
