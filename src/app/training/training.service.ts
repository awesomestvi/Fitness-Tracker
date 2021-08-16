import { Injectable } from "@angular/core";
import { Training } from "./training.model";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  private currentTraining: any;

  constructor() {}

  getCurrentTraining() {
    return { ...this.currentTraining };
  }

  setCurrentTraining(exercise: Training) {
    this.currentTraining = exercise;
  }

  getCurrentTrainingName() {
    return this.currentTraining.name;
  }

  getCurrentTrainingIcon() {
    return this.currentTraining.icon;
  }
}
