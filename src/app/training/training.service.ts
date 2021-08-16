import { Injectable } from "@angular/core";
import { Workouts } from "./training.model";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  currentWorkout: any;

  constructor() {}
}
