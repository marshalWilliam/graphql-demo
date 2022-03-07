import { UserInputError } from "apollo-server-core";
import productModel from "../../models/products";
import { UpdateProduct } from "./producttypes";

// Update Product
export const update_Product = async (
  productInfo: UpdateProduct["input"],
  userID: Buffer
) => {
  const product = await checkProduct(productInfo.id);
  if (product) {
    if (Buffer.compare(product.owner, userID) === 0) {
      return productModel.findByIdAndUpdate(
        productInfo.id,
        {
          name: productInfo.body.name,
          description: productInfo.body.description,
        },
        { new: true }
      );
    } else {
      throw new UserInputError("Cannot update product.");
    }
  } else {
    throw new UserInputError("Product not found.");
  }
};

async function checkProduct(productID: Buffer) {
  return productModel.findById(productID);
}
