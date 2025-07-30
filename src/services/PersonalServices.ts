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

const validatePersonalData = (data: newPersonal | Personal) => {
  const validation = personalSchema.safeParse(data);
  if (!validation.success) {
    throw validation.error;
  }

  return validation.data;
};

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
    const validatedData = validatePersonalData(newP);

    const [results] = await connection.query(
      "INSERT INTO PERSONAL (nombre, direccion, telefono, estatus) VALUES(?, ?, ?, ?)",
      [
        validatedData.nombre,
        validatedData.direccion,
        validatedData.telefono,
        validatedData.estatus,
      ]
    );
    return results;
  } catch (error) {
    return { error: "Error creating personal record" };
  }
};

export const updatePersonal = async (updatePersonal: Personal) => {
  try {
    const validatedData = validatePersonalData(updatePersonal);

    const [results] = await connection.query(
      `UPDATE PERSONAL 
      SET nombre = ?, direccion = ?, telefono = ?, estatus = ?
      WHERE id = ?`,
      [
        validatedData.nombre,
        validatedData.direccion,
        validatedData.telefono,
        validatedData.estatus,
        validatedData.id,
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
