import { buildProperty } from "firecms";

type Params = {
  name: string;
  arrayValues: {
    id: string;
    label: string;
  }[];
  selectMultiple: boolean;
  description?: string;
  defaultValue?: string;

  disabled?: boolean;
  required?: boolean;

  unique?: boolean;
  longDescription?: string;
};
export const getSelectProperty = (props: Params): any => {
  const {
    name,
    defaultValue,
    required,
    description,
    longDescription,
    selectMultiple,
  } = props;

  let enumValues = {};
  props.arrayValues.forEach((item) => {
    enumValues = {
      ...enumValues,
      [item.id]: item.label,
    };
  });
  const selectValues: any = selectMultiple
    ? {
        dataType: "array",
        of: {
          dataType: "string",
          enumValues,
        },
        defaultValue: [defaultValue],
      }
    : {
        dataType: "string",
        enumValues,
        defaultValue: defaultValue || "",
      };
  return buildProperty({
    name,
    validation: {
      required: typeof required === "boolean" ? required : true,
      requiredMessage: "Es necesario el " + name,
    },
    disabled: typeof props.disabled === "boolean" ? props.disabled : false,
    description: description || "",
    longDescription: longDescription || "",
    ...selectValues,
  });
};
