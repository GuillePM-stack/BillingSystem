import mysql from "mysql2/promise";
import { Personal, newPersonal } from "../TypesPersonal";
import { personalSchema } from "../Schemas/personal.Schema";

const connection = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "masterGuasa",
  password: "Protocolo5710@.",
  database: "Billing",
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

export const findPersonal = async (id: number) => {
  try {
    const [results] = await connection.query(
      `SELECT * FROM PERSONAL 
      WHERE id = ? LIMIT 1`,
      [id]
    );
    return results;
  } catch (error) {
    return { error: "Error fetchig personal record" };
  }
};

export const createPersonal = async (newP: newPersonal) => {
  try {
    const validation = personalSchema.safeParse(newP);
    if (!validation.success) {
      return { error: validation.error };
    }

    const [results] = await connection.query(
      "INSERT INTO PERSONAL (nombre, direccion, telefono, estatus) VALUES(?, ?, ?, ?)",
      [newP.nombre, newP.direccion, newP.telefono, newP.estatus]
    );
    return results;
  } catch (error) {
    return { error: "Error creating personal record" };
  }
};

export const updatePersonal = async (newPersonal: Personal) => {
  try {

    const validation = personalSchema.safeParse(newPersonal);
    if (!validation.success) {
      return { error: validation.error };
    }

    const [results] = await connection.query(
      `UPDATE PERSONAL 
      SET nombre = ?, direccion = ?, telefono = ?, estatus = ?
      WHERE id = ?`,
      [
        newPersonal.nombre,
        newPersonal.direccion,
        newPersonal.telefono,
        newPersonal.estatus,
        newPersonal.id,
      ]
    );
    return results;
  } catch (error) {
    return { error: "Error updating personal record" };
  }
};

export const deletePersonal = async (id: number) => {
  try {
    const [results] = await connection.query(
      `DELETE FROM PERSONAL
       WHERE id = ?`,
      [id]
    );
    return results;
  } catch (error) {
    return { error };
  }
};
