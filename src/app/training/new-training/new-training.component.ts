import { Component, OnInit } from "@angular/core";
import { TrainingService } from "../training.service";
import { Training } from "../training.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Training[]>;

  constructor(public trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercises$ = this.trainingService.fetchAvailableExercises();
  }

  startTraining(exercise: Training) {
    this.trainingService.setCurrentTraining(exercise);
    this.trainingService.onGoingTrainingSubject.next(true);
  }
}
