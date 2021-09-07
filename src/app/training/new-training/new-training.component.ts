import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { Exercise } from "../exercise.model";
import { Observable } from "rxjs";
import { ExerciseEntityService } from "../../store/entity/exercise-entity.service";
import { TrainingService } from "../training.service";
import { MatDialog } from "@angular/material/dialog";
import { CustomTrainingComponent } from "../custom-training/custom-training.component";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"],
})
export class NewTrainingComponent implements OnInit {
  exercises$!: Observable<Exercise[]>;

  constructor(
    public exerciseService: ExerciseEntityService,
    private trainingService: TrainingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.exercises$ = this.exerciseService.entities$;
  }

  startTraining(exercise: Exercise) {
    this.trainingService.setCurrentTraining(exercise);
    this.trainingService.onGoingTrainingSubject.next(true);
  }

  createExercise() {
    this.openDialog();
  }

  openDialog(exercise?: Exercise) {
    const dialogRef = this.dialog.open(CustomTrainingComponent, {
      data: {
        ...exercise,
      },
    });
  }

  delete(exercise: Exercise) {
    this.exerciseService.delete(exercise);
  }

  edit(exercise: Exercise) {
    this.openDialog(exercise);
  }
}
