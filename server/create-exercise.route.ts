import { Request, Response } from "express";
import { EXERCISES } from "./db-data";

export var exercisesKeyCounter = 100;

export function createExercise(req: Request, res: Response) {
  console.log("Creating new exercise ...");

  const changes = req.body;

  const newExercise = {
    id: exercisesKeyCounter,
    seqNo: exercisesKeyCounter,
    ...changes,
  };

  EXERCISES[newExercise.id] = newExercise;

  exercisesKeyCounter += 1;

  setTimeout(() => {
    res.status(200).json(newExercise);
  }, 2000);
}
