import { buildProperty } from "firecms";

type Props = {
  name: string;
};
export const KeyValue = (props: Props) => {
  const { name } = props;
  return buildProperty({
    dataType: "map",
    name,
    keyValue: true,
  });
};
