import { buildProperty } from "firecms";

type Params = {
  name: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
};
const workers = [
  { name: "Juan", id: 1 },
  { name: "Pedro", id: 2 },
  { name: "Maria", id: 3 },
];
const getEnumsWorker = () => {
  return workers.map((worker) => {
    return { id: worker.id.toString(), label: worker.name };
  });
};

export const getIdWorker = (props: Params) => {
  const { name, description } = props;
  const disabled = typeof props.disabled === "boolean" ? props.disabled : false;
  const required = typeof props.required === "boolean" ? props.required : true;
  const property = buildProperty({
    name,
    dataType: "string",
    validation: { required, requiredMessage: "Es requerido" },
    enumValues: getEnumsWorker(),
    description: description || "",
    disabled: disabled,
  });

  return property;
};
