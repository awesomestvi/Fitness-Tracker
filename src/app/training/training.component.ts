import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { TrainingService } from "./training.service";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"],
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingExercise: Boolean | undefined;
  exerciseSubscription: Subscription | undefined;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.onGoingTraining.subscribe(
      (status) => (this.onGoingExercise = status)
    );
  }

  ngOnDestroy() {
    this.exerciseSubscription?.unsubscribe();
  }
}
