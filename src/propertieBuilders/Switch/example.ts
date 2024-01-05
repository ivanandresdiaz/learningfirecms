import { buildProperty } from "firecms";

type Props = {
  name: string;
};

export const SwitchExample = ({ name }: Props) =>
  buildProperty({
    name,
    dataType: "boolean",
  });
