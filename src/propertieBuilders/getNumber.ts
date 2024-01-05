import { buildProperty } from "firecms";

type Params = {
  name: string;
  defaultValue?: number;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
};
export const getNumberProperty = (props: Params) => {
  const { name, defaultValue, description } = props;
  const disabled = typeof props.disabled === "boolean" ? props.disabled : false;
  const required = typeof props.required === "boolean" ? props.required : true;
  const minNumber = typeof props.min === "number" ? props.min : -1;
  const maxNumber = typeof props.max === "number" ? props.max : undefined;
  const property = buildProperty({
    name,
    validation: {
      required: required,
      requiredMessage: "Es necesario el " + name,
      min: minNumber,
      max: maxNumber,
    },
    description: description || "",
    defaultValue: defaultValue || 0,
    dataType: "number",
    disabled: disabled,
  });

  return property;
};
