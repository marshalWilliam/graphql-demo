import { Schema, model, Document, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

type ProductDocument = {
  id: Buffer;
  name: string;
  description: string;
  owner: Buffer;
  cursor: Buffer;
} & Document;

const productSchema = new Schema<ProductDocument>(
  {
    _id: { type: Buffer, alias: "id", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Buffer, required: true },
    cursor: {
      type: Buffer,
      required: true,
      default(this) {
        const buffer = Buffer.from(this.updatedAt);

        return Buffer.concat([buffer, this._id]);
      },
    },
  },
  { timestamps: true }
);

productSchema.plugin(paginate);

const productModel = model<ProductDocument, PaginateModel<ProductDocument>>(
  "productdb",
  productSchema
);

export default productModel;
