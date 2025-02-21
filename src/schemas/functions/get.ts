import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
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

//Check if account email exist
export async function checkEmail(email: string) {
  return accountModel.findOne({ emailAddress: email });
}

// Issue a JWT
export async function issueToken(id: string, email: string) {
  return jwt.sign({ user_id: id, email }, "RANDOM_STRING", {
    expiresIn: "1h",
  });
}

// Get unique ID
export function getID(identifier: string) {
  return uuidv4().replaceAll("-", "").concat(identifier);
}

export async function checkID(id: string) {
  return accountModel.findById(id);
}
