import { buildProperty } from "firecms";

type Props = {
  name: string;
  description: string;
  path: string;
};

export const productoReferente = ({ name, description, path }: Props) =>
  buildProperty({
    name,
    dataType: "reference",
    path,
    description,
    // previewProperties: ["name", "main_image"],
  });

export const productoReferenteMultiples = ({
  name,
  description,
  path,
}: Props) =>
  buildProperty({
    dataType: "array",
    name,
    description,
    of: {
      dataType: "reference",
      path,
    },
  });
