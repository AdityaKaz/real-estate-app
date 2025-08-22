import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;

app.on("error", (error) => {
  console.log("Error: ", error);
  throw error;
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection Failed !", error);
  });
