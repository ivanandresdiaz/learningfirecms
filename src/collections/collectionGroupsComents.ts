import { buildCollection } from "firecms";
import { Groups } from "./groups";
import { CO } from "../constants/CO";
import { getTextProperty } from "../propertieBuilders/Text/getTextProperty";

type Coments = {
  coment: string;
};

export const CollecionGroupProducsComentarios = buildCollection<Coments>({
  path: CO.products_coments,
  group: Groups.admin,
  permissions: {
    read: true,
    create: false,
    delete: true,
  },
  collectionGroup: true,
  name: "Todos los comentarios",
  singularName: "Comentario",
  properties: {
    coment: getTextProperty({
      name: "Comentario",
    }),
  },
});
