import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from "http";
let server: Server;

//destructuring from config file
const { port, database_url } = config;

async function main() {
  await mongoose.connect(database_url as string);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  try {
    //var prob = 10;
    server = app.listen(port, () => {
      console.log(`PH-university app is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
