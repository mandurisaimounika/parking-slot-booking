import { Pool } from "pg";

//Database connection info to establish a connection
//Input values has to changed based on your system
export const pool = new Pool({
  user: "test",
  host: "localhost",
  database: "parkingslotapi",
  password: "password",
  port: 5432,
});
