import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { TrainingService } from "../training.service";
import { Workouts } from "../training.model";
import WorkoutStore from "../training.store";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit {
  @Output() workoutStatus = new EventEmitter<void>();
  workouts: Workouts[] = [];

  constructor(public trainingService: TrainingService) {
    const { workouts } = WorkoutStore;
    this.workouts = workouts;
  }

  ngOnInit(): void {}

  startWorkout(workout: Workouts) {
    this.workoutStatus.emit();
    this.trainingService.currentWorkout = workout;
  }
}
