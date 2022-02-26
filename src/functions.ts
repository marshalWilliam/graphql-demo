// model
import accountModel from "../models/accounts";
import productModel from "../models/products";

//Display all Accounts
export const getAccounts = async () => {
  return accountModel.find({});
};

//Display all Products
export const getProducts = async () => {
  return productModel.find({});
};

// Find Account
export const getAccount = async (userid: Buffer) => {
  return accountModel.findById(userid);
};

// Find Product
export const getProduct = async (userid: Buffer) => {
  return productModel.findById(userid);
};

// // POST
// export const addUser = (
//   userid: number,
//   userFname: string,
//   userLname: string
// ) => {
//   userModel.create({ userID: userid, fname: userFname, lname: userLname });
// };

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
