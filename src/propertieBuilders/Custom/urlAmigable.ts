import { buildProperty } from "firecms";

export const urlAmigableProperty = buildProperty({
  name: "Url amigable",
  description:
    'La url amigable puede contener letras, números y guiones. Ejemplo: "mi-url-amigable"',
  validation: {
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    matches: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    requiredMessage: "Es necesario escribir una url",
  },
  dataType: "string",
});

type Props = {
  required?: boolean;
};
export const getUrlAmigableProperty = (props: Props) => {
  const { required } = props;
  return buildProperty({
    name: "Url amigable",
    description:
      'La url amigable puede contener letras, números y guiones. Ejemplo: "mi-url-amigable"',
    validation: {
      required: typeof required === "boolean" ? required : true,
      trim: true,
      unique: true,
      lowercase: true,
      matches: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      requiredMessage: "Es necesario escribir una url",
    },
    dataType: "string",
  });
};
