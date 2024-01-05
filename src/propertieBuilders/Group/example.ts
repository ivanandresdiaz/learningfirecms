/* eslint-disable prefer-const */
import { buildProperty } from "firecms";

type Props = {
  name: string;
  expanded: boolean;
  values: {
    name: string;
    dataType: "string" | "number";
  }[];
};

export const GroupMapProperty = (props: Props) => {
  const { name, expanded, values } = props;
  let properties: any = {};
  values.forEach((value) => {
    properties[value.name] = {
      name: value.name,
      dataType: value.dataType,
    };
  });
  console.log("properties", properties);

  return buildProperty({
    name,
    dataType: "map",
    properties: {
      ...properties,
    },
    expanded,
  });
};
