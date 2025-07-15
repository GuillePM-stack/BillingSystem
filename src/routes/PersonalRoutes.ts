import express, { Request, Response } from "express";
import * as PersonalServices from "../services/PersonalServices";

//We create a router to handle personal routes
const router = express.Router();

//Route: "http:localhost:3001/api/personal/" <---
router.get("/", async (_req: Request, res: Response) => {
  let personal = await PersonalServices.getAllPersonal();
  res.send(personal);
});

export default router;
