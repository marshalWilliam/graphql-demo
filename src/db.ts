import mongoose = require("mongoose");

const host = process.env.MONGO_URI || "mongodb://localhost:2717/test";

// main
export function main() {
  return new Promise((resolve) => {
    mongoose
      .connect(host)
      .then((value) => {
        console.log(`Successfully connected...`);
        resolve(value);
      })
      .catch((e) => {
        return e;
      });
  });
}

export function close(): Promise<void> {
  return mongoose.disconnect();
}
