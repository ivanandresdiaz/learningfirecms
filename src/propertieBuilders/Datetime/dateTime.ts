import { buildProperty } from "firecms";

export const createdAtProperty = buildProperty({
  dataType: "date",
  name: "Fecha de creación",
  mode: "date",
  description: "Se llena en background, no es necesario completar",
  autoValue: "on_create",
});

export const updatedAtProperty = buildProperty({
  dataType: "date",
  name: "Ultima Actualización",
  mode: "date_time",
  description: "Se llena en background, no es necesario completar",
  autoValue: "on_update",
});

type PropsDeleteAt = {
  name: string;
  description: string;
};
export const deletedAtProperty = (props: PropsDeleteAt) => {
  const { name, description } = props;
  return buildProperty({
    dataType: "date",
    name,
    mode: "date",
    description,
  });
};
