import * as express from "express";
import * as bodyParser from "body-parser";
import bookingRoute from "./booking";
import {
  createUser
} from "./database/addUsersToDatabase";

// Create an express app
const app = express();
app.use(bodyParser.json());

//Endpoint can be used to create users in database
app.post("/users", createUser);

//Routes to be used
app.use("/", bookingRoute);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});