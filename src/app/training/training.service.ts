import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Training } from "./training.model";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  private currentTraining: Training | undefined;
  onGoingTraining = new Subject<Boolean>();

  constructor() {}

  getCurrentTraining() {
    return { ...this.currentTraining };
  }

  setCurrentTraining(exercise: Training) {
    this.currentTraining = exercise;
  }

  getCurrentTrainingName() {
    return this.currentTraining?.name;
  }

  getCurrentTrainingIcon() {
    return this.currentTraining?.icon;
  }
}
