import { buildCollection } from "firecms";
import { Groups } from "./groups";
import { CO } from "../constants/CO";
import { permissions } from "../lib/permissions";
import { getTextProperty } from "../propertieBuilders/Text/getTextProperty";

type Coments = {
  coment: string;
};

export const collectioStuff = buildCollection<Coments>({
  path: CO.stuff,
  group: Groups.admin,
  permissions: permissions,
  name: "Stuffe",
  singularName: "stuff",
  properties: {
    coment: getTextProperty({
      name: "Stuffe",
    }),
  },
});
