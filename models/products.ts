import { Schema, model, Document } from "mongoose";

type ProductDocument = {
  id: Buffer;
  name: string;
  description: string;
  owner: Buffer;
} & Document;

const productSchema = new Schema<ProductDocument>(
  {
    _id: { type: Buffer, alias: "id", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Buffer, required: true },
  },
  { timestamps: true }
);

const productModel = model<ProductDocument>("productdb", productSchema);

export default productModel;
