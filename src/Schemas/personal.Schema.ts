import { z } from "zod";

//Validations with zod - creating a schema
export const personalSchema = z
  .object({
    nombre: z
      .string()
      .min(2, "Mínimo 2 caracteres")
      .max(200, "Máximo 200 caracteres"),
    direccion: z.string().min(2).max(300),
    telefono: z.string().min(10).max(15),
    estatus: z.number().int().positive(),
  })
  .refine((data) => data.direccion == "TEC DE CULIACÁN", {
    message: "La dirección debe ser del TEC DE CULIACÁN",
    path: ["direccion"],
  })
  .refine((data) => data.estatus <= 2, {
    message: "Los valores correctos son 1 (vigente) y 2 (baja)",
    path: ["estatus"],
  });
