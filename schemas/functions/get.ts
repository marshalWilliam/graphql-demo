import jwt from "jsonwebtoken";
import accountModel from "../../models/accounts";
import productModel from "../../models/products";

//Display all Accounts
export const getAccounts = async () => {
  return accountModel.find({});
};

//Display all Products
export async function getProducts() {
  return productModel.find({});
}

// Find Account
export async function getAccount(userid: Buffer) {
  return accountModel.findById(userid);
}

// Find Product
export async function getProduct(userid: Buffer) {
  return productModel.findById(userid);
}

//Check if email exist
export async function checkEmail(email: string) {
  return accountModel.findOne({ emailAddress: email });
}

export async function issueToken(id: string, email: string) {
  return jwt.sign({ user_id: id, email }, "RANDOM_STRING", {
    expiresIn: "1h",
  });
}
