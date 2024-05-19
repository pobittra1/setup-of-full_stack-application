import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

//destructuring from config file
const { port, database_url } = config;

async function main() {
  await mongoose.connect(database_url as string);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  try {
    //var prob = 10;
    app.listen(port, () => {
      console.log(`my app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
