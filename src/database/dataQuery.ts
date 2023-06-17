import { pool } from "./databaseConnection";

//Query executing function for postgresql
export const executeQuery = async (text: string, values?: string[]) => {
  const query = {
    text,
    values,
  };

  const res = await pool.query(query);
  return res.rows;
};

//Query to retrieve the data with id.
//It can be reused in future for user existence checking in database
export const dataQueryWithId = async (id) => {
  const query = {
    text: "SELECT * FROM bookings WHERE id = $1",
    values: [id],
  };

  const res = await pool.query(query);
  return res.rows;
};
