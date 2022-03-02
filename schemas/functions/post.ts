import { UserInputError } from "apollo-server-core";
import bycrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import accountModel from "../../models/accounts";
import productModel from "../../models/products";
import { checkEmail, issueToken } from "./get";
import { LoginUser, CreateUser } from "./usertypes";

// POST
export async function addUser(user: CreateUser["input"]): Promise<string> {
  //console.log(user);
  if (await checkEmail(user.emailAddress)) {
    throw new UserInputError("Email address already used.");
  }

  const { id, email, hashedPassword, token } = await getUserInfo(user);

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

//User
async function getUserInfo(user: CreateUser["input"]) {
  const id = uuidv4().replaceAll("-", "").concat("account");
  const hashedPassword = await bycrypt.hash(user.password, 10);
  const email = user.emailAddress;
  const token = issueToken(id, email);

  return { id, email, hashedPassword, token };
}

//Add Product
export async function addProduct(productInfo: any) {
  const id = uuidv4().replaceAll("-", "").concat("product");
  const newProduct = new productModel({
    _id: id,
    name: productInfo.name,
    description: productInfo.description,
    owner: productInfo.id,
  });

  return newProduct.save();
}
