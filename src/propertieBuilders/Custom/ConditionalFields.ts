export const setPriceProperty = ({ values }: any) => ({
  dataType: "number",
  name: "Price",
  validation: {
    requiredMessage: "You must set a price between 0 and 1000",
    min: 0,
    max: 1000,
  },
  disabled: !values.public && {
    clearOnDisabled: true,
    disabledMessage: "You can only set the price on available items",
  },
  description: "Price with range validation",
});
