import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "localhost",
  user: "masterGuasa",
  port: 3307,
  password: "Protocolo5710@.",
  database: "facturation", 
});

//Function to get all personal records
export const getAllPersonal = async () => {
  try {
    const [results] = await connection.query("SELECT * FROM PERSONAL");
    return results;
  } catch (error) {
    console.error("Error detallado de MySQL:", error);
    return { error: "Error fetching personal records" };
  }
};
