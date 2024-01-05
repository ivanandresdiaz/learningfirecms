import { buildProperty } from "firecms";

type Props = {
  name: string;
  expanded: boolean;
};

export const RepeatProperty = (props: Props) => {
  const { name, expanded } = props;
  return buildProperty({
    dataType: "array",
    name,
    of: {
      dataType: "string",
      previewAsTag: true,
    },
    expanded,
  });
};
