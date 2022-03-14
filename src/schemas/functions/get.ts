import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import accountModel from "../../models/accounts";
import productModel from "../../models/products";
import { Product } from "./producttypes";

//Display all Accounts
export async function getAccounts() {
  return accountModel.find({});
}

//Display all Products
export async function getProducts() {
  return productModel.find({});
}

// Find Account
export async function getAccount(userid: Buffer) {
  return accountModel.findById(userid);
}

// Find Product
export async function getProduct(productID: Buffer) {
  return productModel.findById(productID);
}

//Check if account email exist
export async function checkEmail(email: string) {
  return accountModel.findOne({ emailAddress: email });
}

// Issue a JWT
export async function issueToken(id: Buffer, email: string) {
  return jwt.sign({ user_id: id, email }, "RANDOM_STRING", {
    expiresIn: "1h",
  });
}

// Get unique ID
export function getID(identifier: string) {
  return Buffer.from(uuidv4().replaceAll("-", "").concat(identifier));
}

// Check if ID exist
export async function checkID(id: Buffer) {
  if (id.toString().includes("product", 32)) {
    return productModel.findById(id);
  } else if (id.toString().includes("account", 32)) {
    return accountModel.findById(id);
  } else {
    return null;
  }
}

// Get paginated products
export async function getPaginatedProducts(paginateOptions: any) {
  const options = {
    limit: paginateOptions.first,
    sort: { name: paginateOptions.sort ? paginateOptions.sort.name : 1 },
  };
  const findOptions = {
    updatedAt: {
      $lt: paginateOptions.after
        ? paginateOptions.after
        : Buffer.from(new Date()),
    },
  };

  const result = await productModel.paginate(findOptions, options);

  return getPaginatedResult(result.docs, result.hasNextPage);
}

// Get Paginated Result
function getPaginatedResult(products: Product | any, hasNextPage: boolean) {
  const edges: Array<any> = [];
  let endCursor: Buffer | undefined;

  for (let index = 0; index < products.length; index++) {
    const cursor = Buffer.from(products[index].cursor);
    edges.push({ cursor, node: products[index] });

    if (index == products.length - 1) {
      endCursor = cursor;
    }
  }

  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor,
    },
  };
}
