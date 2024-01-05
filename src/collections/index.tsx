/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Preview from "./Custom/Preview";
import Field from "./Custom/Field";

import { buildCollection, useSnackbarController } from "firecms";
import { CO } from "../constants/CO";
import { Groups } from "./groups";
import { permissions } from "../lib/permissions";
import { getTextProperty } from "../propertieBuilders/Text/getTextProperty";
import { setPriceProperty } from "../propertieBuilders/Custom/ConditionalFields";
import { imageUploadPropery } from "../propertieBuilders/FileUpload/example";
import { SwitchExample } from "../propertieBuilders/Switch/example";
import { productoReferente } from "../propertieBuilders/Reference/Example";
import {
  createdAtProperty,
  updatedAtProperty,
} from "../propertieBuilders/Datetime/dateTime";
import { getSelectProperty } from "../propertieBuilders/Select";
import { GroupMapProperty } from "../propertieBuilders/Group/example";

type Coments = {
  coment: string;
};

export const collectionGroupComentarios = buildCollection<Coments>({
  path: CO.products_coments,
  collectionGroup: true,
  group: Groups.tienda,
  permissions: permissions,
  name: "Collecion Group Comentario",
  singularName: "comenario",
  properties: {
    coment: getTextProperty({
      name: "Comentario",
    }),
  },
});

export const subCollecionProducsComentarios = buildCollection<Coments>({
  path: CO.products_coments,
  group: Groups.tienda,
  permissions: permissions,
  name: "Comentario",
  singularName: "producto",
  properties: {
    coment: getTextProperty({
      name: "Comentario",
    }),
  },
});

type Products = {
  name: string;
  price: number;
  status: string;
  singleSelected: string;
  multipleSelected: string[];
  custom: string;
  imageUpload: string;
  switch: boolean;
  group: any;
  groups: any;
  createdAt: Date;
  updatedAt: Date;
  reference: any;
  keyvalue: any;
};

export const productsCollection = buildCollection<Products>({
  path: CO.products,
  group: Groups.tienda,
  Actions: (props: any) => {
    const snackbarController = useSnackbarController();
    return (
      <div>
        <button
          onClick={() => {
            snackbarController.open({
              type: "error",
              // title: "Hey!",
              message: "Test snackbar",
            });
          }}
        >
          Click me
        </button>
        <button
          onClick={() => {
            snackbarController.open({
              type: "success",
              message: "Test snackbar",
            });
          }}
        >
          Success
        </button>
      </div>
    );
  },
  permissions: permissions,
  name: "ProductOs",
  singularName: "Product",
  exportable: false,
  callbacks: {
    onPreSave: async (props) => {
      try {
        const { values, context } = props;
        const { storageSource } = context;
        const { getDownloadURL } = storageSource;
        const { imageUpload } = values;
        if (!imageUpload) return { ...props.values };
        const url = await getDownloadURL(imageUpload);
        return { ...props.values, imageUpload_url: url };
      } catch (error) {
        throw new Error("error al guardar iamgen");
      }
    },
  },
  // filterCombinations: [],
  // initialFilter: {},
  // forceFilter: {},
  subcollections: [subCollecionProducsComentarios],
  views: [
    // Custom Entity Views
    // {
    //   name: "View Customise",
    //   path: "name",
    //   Builder: (props) => {
    //     console.log("props CUSTMO", props);
    //     return (
    //       <div>
    //         <p>{"props.entity?.values.custom" || "Indefinido"}</p>
    //         <button>X</button>
    //       </div>
    //     );
    //   },
    // },
  ],
  textSearchEnabled: true,
  additionalFields: [
    // {
    //   id: "custom",
    //   name: "Aditional Filed",
    //   Builder: (props) => {
    //     console.log("props, context", props.context);
    //     return (
    //       <div>
    //         <p>{props.entity.values.custom || "preview"}</p>
    //       </div>
    //     );
    //   },
    // },
  ],
  // propertiesOrder: ["status", "name", "price"],
  // callbacks: {
  //   onFetch: async (props) => {
  //     return { ...props.entity, x: "dd" };
  //   },
  // },
  // hideFromNavigation: true,
  // defaultSize: "l",
  properties: {
    name: getTextProperty({
      name: "Name",
      required: true,
    }),

    singleSelected: getSelectProperty({
      name: "singleSelected",
      arrayValues: [
        {
          id: "valor_1",
          label: "Valor 1",
        },
        {
          id: "valor_2",
          label: "Valor 2",
        },
        {
          id: "valor_3",
          label: "Valor 3",
        },
      ],
      selectMultiple: false,
    }),
    multipleSelected: getSelectProperty({
      name: "singleSelected",
      arrayValues: [
        {
          id: "valor_1",
          label: "Valor 1",
        },
        {
          id: "valor_2",
          label: "Valor 2",
        },
        {
          id: "valor_3",
          label: "Valor 3",
        },
      ],
      selectMultiple: true,
    }),
    group: {
      name: "Address",
      dataType: "map",
      properties: {
        street: {
          name: "Street",
          dataType: "string",
        },
        postal_code: {
          name: "Postal code",
          dataType: "number",
        },
      },
    },
    groups: {
      name: "Groups multiple",
      dataType: "array",
      of: {
        dataType: "map",
        properties: {
          name: {
            name: "Name",
            dataType: "string",
          },
          phone: {
            name: "Phone",
            dataType: "string",
          },
        },
      },
      expanded: true,
    },
    keyvalue: {
      dataType: "map",
      name: "Key value",
      keyValue: true,
    },

    price: (props) => {
      const d: any = setPriceProperty(props);
      return d;
    },
    imageUpload: imageUploadPropery({
      name: "Image Upload",
      description: "Desription of the image upload",
      collectionPath: CO.products,
      path: "idPersonaliza",
    }),
    switch: SwitchExample({
      name: "Switch",
    }),
    custom: {
      dataType: "string",
      name: "Name",
      Preview: () => <div>Preview Listo</div>,
      // previewAsTag: true,
      // Preview: Preview,
      Field: Field,
    },
    reference: productoReferente({
      name: "Referencia",
      path: CO.stuff,
      description: "Referencia a otro producto",
    }),
    createdAt: (props) => {
      console.log("prop createdAts", props);
      return createdAtProperty;
    },
    updatedAt: updatedAtProperty,
    status: {
      name: "Status",
      validation: { required: true },
      dataType: "string",
      description: "Should this product be visible in the website",
      longDescription:
        "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
      enumValues: {
        private: "Private",
        public: "Public",
      },
    },
  },
});
