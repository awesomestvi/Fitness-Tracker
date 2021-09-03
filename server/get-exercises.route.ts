import { Request, Response } from "express";
import { EXERCISES } from "./db-data";

export function getAllExercises(req: Request, res: Response) {
  console.log("Retrieving exercises data ...");

  setTimeout(() => {
    res.status(200).json(Object.values(EXERCISES));
  }, 1000);
}

// export function getCourseByUrl(req: Request, res: Response) {
//   const exerciseUrl = req.params["exerciseUrl"];

//   const exercises: any = Object.values(EXERCISES);

//   const exercise = exercises.find((exercise) => exercise.url == exerciseUrl);

//   setTimeout(() => {
//     res.status(200).json(exercise);
//   }, 1000);
// }
