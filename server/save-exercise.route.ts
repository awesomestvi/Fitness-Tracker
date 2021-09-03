import { Request, Response } from "express";
import { EXERCISES } from "./db-data";

export function saveExercise(req: Request, res: Response) {
  console.log("Saving Exercise ...");

  const id = req.params["id"],
    changes = req.body;

  EXERCISES[id] = {
    ...EXERCISES[id],
    ...changes,
  };

  setTimeout(() => {
    res.status(200).json(EXERCISES[id]);
  }, 2000);
}
