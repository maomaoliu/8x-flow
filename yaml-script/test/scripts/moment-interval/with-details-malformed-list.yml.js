import template from "../../template";

export const yaml = template`
${'type'}: Order
key_timestamps:
  - created_at
details:
  Order Item:
  key_timestamps: [1,2]
`