import { buildProperty } from "firecms";
import { CO } from "../../constants/CO";

type Props = {
  name: string;
  description: string;
  collectionPath: string;
  path: string;
};

export const imageUploadPropery = (props: Props) => {
  const { name, collectionPath, path } = props;
  const collectionName = CO[collectionPath as keyof typeof CO];
  const storagePath = `${collectionName}/${path}`;
  return buildProperty({
    dataType: "string",
    name,
    storage: {
      storagePath,
      acceptedFiles: ["image/*"],
      // maxSize: 1024 * 1024,
      metadata: {
        cacheControl: "max-age=1000000",
      },
    },
  });
};
