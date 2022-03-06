import { UserInputError } from "apollo-server-core";
import productModel from "../../models/products";

// Update Product
export const delete_Product = async (productID: Buffer, userID: Buffer) => {
  const product = await checkProduct(productID);
  if (product) {
    if (!Buffer.compare(product.owner, userID)) {
      if (await productModel.findByIdAndDelete(productID)) return true;
    } else {
      throw new UserInputError("Cannot delete product.");
    }
  } else {
    throw new UserInputError("Product not found.");
  }
};

async function checkProduct(productID: Buffer) {
  return productModel.findById(productID);
}
