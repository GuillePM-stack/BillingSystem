import express, { Request, Response } from "express";
import * as PersonalServices from "../services/PersonalServices";

//We create a router to handle personal routes
const router = express.Router();

//Route: "http:localhost:3001/api/personal/" <---
router.get("/", async (_req: Request, res: Response) => {
  let personal = await PersonalServices.getAllPersonal();
  res.send(personal);
});

//Route: "http:localhost:3001/api/personal/#" <---
router.get("/:id", async (req: Request, res: Response) => {
  let personal = await PersonalServices.findPersonal(Number(req.params.id));
  res.send(personal);
});

//Route: "http:localhost:3001/api/personal/" <---
//This route will create a new personal record
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nombre, direccion, telefono, estatus } = req.body;
    const newPersonal = await PersonalServices.createPersonal({
      nombre,
      direccion,
      telefono,
      estatus,
    });

    res.send(newPersonal);
  } catch (error) {
    // res.send('Error creating personal record');
    res.status(400).send("Data not valid");
  }
});

//Route: "http:localhost:3001/api/personal/#" <---
//This route will update an existing personal record
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id, nombre, direccion, telefono, estatus } = req.body;
    const updatedPersonal = await PersonalServices.updatePersonal({
      id,
      nombre,
      direccion,
      telefono,
      estatus,
    });
    res.send(updatedPersonal);
  } catch (error) {
    res.status(400).send("Error updating personal record");
  }
});

//Route: "http:localhost:3001/api/personal/#" <---
//This route will delete a personal record
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const deletedPersonalResult = await PersonalServices.deletePersonal(Number(id));

    const affectedRows = (deletedPersonalResult as any)?.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).send("Registro de personal no encontrado.");
    }
  
    return  res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar registro de personal:", error);
    res.status(500).send("Error del servidor al eliminar el registro.");
    return;
  }
});

export default router;
