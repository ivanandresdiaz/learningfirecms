import { buildProperty } from "firecms";

type Params = {
  name: string;
  description?: string;
  defaultValue?: string;
  multiline?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  email?: boolean;
  matches?: any;
  unique?: boolean;
  longDescription?: string;
  markdown?: boolean;
};
export const getTextProperty = (props: Params) => {
  const {
    name,
    defaultValue,
    multiline,
    required,
    email,
    description,
    matches,
    longDescription,
    minLength,
    maxLength,
    markdown,
  } = props;
  const matchesRegex = matches ? { matches } : {};
  const minLengthProp = minLength ? { minLength } : {};
  const maxLengthProp = maxLength ? { maxLength } : {};

  return buildProperty({
    name,
    validation: {
      required: typeof required === "boolean" ? required : true,
      requiredMessage: "Es necesario el " + name,
      unique: typeof props.unique === "boolean" ? props.unique : false,
      ...matchesRegex,
      ...maxLengthProp,
      ...minLengthProp,
    },

    disabled: typeof props.disabled === "boolean" ? props.disabled : false,
    defaultValue: defaultValue || "",
    description: description || "",
    longDescription: longDescription || "",
    dataType: "string",
    email: !!email,
    multiline: !!multiline,
    markdown: !!markdown,
  });
};
