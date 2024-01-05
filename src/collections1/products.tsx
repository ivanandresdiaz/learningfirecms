import { buildCollection } from "firecms";
import { CO } from ".";
import { Input } from "@mui/material";
import ActionButtom from "../components/ActionButtom";

export const productsCollection = buildCollection({
  path: CO.products,
  permissions: ({ user }) => {
    const uid = "lnenO1pc9WPjQJhGJnT7JRvKkO22";

    if (user?.uid === uid) {
      return {
        edit: true,
        create: true,
        delete: false,
      };
    }
    return {
      edit: true,
      create: false,
      delete: true,
    };
  },
  singularName: "nombre",
  name: "Cualquier Nombre",
  Actions: (props) => {
    console.log("Actions", props);
    return <ActionButtom />;
  },
  callbacks: {
    async onFetch(entityFetchProps) {
      console.log("onFetch", entityFetchProps);

      return {
        ...entityFetchProps.entity,
        values: {
          customAction: entityFetchProps.entity.id + "desde prefecth",
          ...entityFetchProps.entity.values,
        },
      };
    },
  },
  additionalFields: [
    {
      id: "customAction",
      name: "Aditional Action",
      Builder: (props) => {
        // return <Button>Custom Action</Button>;
        console.log("customAction pros", props);
        const { entity } = props;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values: any = entity.values;
        const customAction = values.customAction;
        return <Input value={customAction} />;
      },
    },
  ],
  properties: {
    name: {
      name: "Name",
      validation: { required: true },
      dataType: "string",
    },
    price: {
      name: "Price",
      validation: {
        required: true,
        requiredMessage: "You must set a price between 0 and 1000",
        min: 0,
        max: 1000,
      },
      description: "Price with range validation",
      dataType: "number",
    },
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
