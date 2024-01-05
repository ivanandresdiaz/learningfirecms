import { buildProperty } from "firecms";

export const Block = () => {
  return buildProperty({
    name: "Content",
    dataType: "array",
    oneOf: {
      typeField: "type",
      valueField: "value",
      properties: {
        images: {
          dataType: "string",
          name: "Image",
          storage: {
            storagePath: "images",
            acceptedFiles: ["image/*"],
          },
        },
        text: {
          dataType: "string",
          name: "Text",
          markdown: true,
        },
        products: {
          name: "Products",
          dataType: "array",
          of: {
            dataType: "reference",
            path: "products",
            previewProperties: ["name", "main_image"],
          },
        },
      },
    },
  });
};
