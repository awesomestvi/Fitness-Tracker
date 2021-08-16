import { Component, OnInit } from "@angular/core";
import { TrainingService } from "../training.service";
import { Training } from "../training.model";
import TrainingStore from "../training.store";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit {
  exercises: Training[] = [];

  constructor(public trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercises = TrainingStore.getAvailableExercises();
  }

  startTraining(exercise: Training) {
    this.trainingService.setCurrentTraining(exercise);
    this.trainingService.onGoingTraining.next(true);
  }
}
