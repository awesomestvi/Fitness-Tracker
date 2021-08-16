import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { TrainingService } from "../training.service";
import { Training } from "../training.model";
import TrainingStore from "../training.store";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit {
  @Output() exerciseStatus = new EventEmitter<void>();
  exercises: Training[] = [];

  constructor(public trainingService: TrainingService) {
    const { availableExercise } = TrainingStore;
    this.exercises = availableExercise;
  }

  ngOnInit(): void {}

  startTraining(exercise: Training) {
    this.exerciseStatus.emit();
    this.trainingService.setCurrentTraining(exercise);
  }
}
