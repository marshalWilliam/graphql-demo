// model
import { UserInputError } from "apollo-server-core";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import accountModel from "../models/accounts";
import productModel from "../models/products";
import { LoginUser, CreateUser } from "./usertypes";

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

// POST
export async function addUser(user: CreateUser["input"]): Promise<string> {
  //console.log(user);
  if (await checkEmail(user.emailAddress)) {
    throw new UserInputError("Email address already used.");
  }

  const id = uuidv4().replaceAll("-", "").concat("account");
  const hashedPassword = await bycrypt.hash(user.password, 10);
  const email = user.emailAddress;
  const token = jwt.sign({ user_id: id, email }, "RANDOM_STRING", {
    expiresIn: "1h",
  });

  const newUser = new accountModel({
    _id: id,
    firstname: user.firstname.trim(),
    lastname: user.lastname.trim(),
    emailAddress: email,
    password: hashedPassword,
    token,
  });

  await newUser.save();

  return token;
}

//User Login
export async function login(userLogin: LoginUser["input"]) {
  const userInfo = await checkEmail(userLogin.emailAddress);
  if (userInfo) {
    if (await bycrypt.compare(userLogin.password, userInfo.password)) {
      return userInfo.token;
    } else {
      throw new UserInputError("Invalid credentials.");
    }
  } else {
    throw new UserInputError("Invalid credentials.");
  }
}

// // PUT
// export const updateUser = async (
//   userFname: string,
//   userLname: string,
//   userid: number
// ) => {
//   return userModel.findOneAndUpdate(
//     { userID: userid },
//     { fname: userFname, lname: userLname },
//     { new: true }
//   );
// };

// //DELETE
// export const deleteUser = async (userid: number) => {
//   return userModel.findOneAndRemove({ userID: userid });
// };

//Check if email exist
async function checkEmail(email: string) {
  return accountModel.findOne({ emailAddress: email });
}
