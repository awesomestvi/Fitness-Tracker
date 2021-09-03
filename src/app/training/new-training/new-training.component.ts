import { Component, OnInit } from "@angular/core";
import { Exercise } from "../exercise.model";
import { Observable } from "rxjs";
import { ExerciseEntityService } from "../../store/entity/exercise-entity.service";
import { TrainingService } from "../training.service";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;

  constructor(
    public exerciseService: ExerciseEntityService,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.exercises$ = this.exerciseService.entities$;
  }

  startTraining(exercise: Exercise) {
    this.trainingService.setCurrentTraining(exercise);
    this.trainingService.onGoingTrainingSubject.next(true);
  }
}
