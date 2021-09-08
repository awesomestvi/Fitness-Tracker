import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { Exercise } from "../exercise.model";
import { Observable } from "rxjs";
import { ExerciseEntityService } from "../../store/entity/exercise-entity.service";
import { TrainingService } from "../training.service";
import { MatDialog } from "@angular/material/dialog";
import { CustomTrainingComponent } from "../custom-training/custom-training.component";
import { map, tap } from "rxjs/operators";
import { CommonService } from "src/app/shared/common.service";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"],
})
export class NewTrainingComponent implements OnInit {
  exercises$!: Observable<Exercise[]>;
  customExercise$!: Observable<Exercise[]>;

  constructor(
    public exerciseService: ExerciseEntityService,
    private trainingService: TrainingService,
    public dialog: MatDialog,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    // Default Workouts
    this.exercises$ = this.exerciseService.entities$.pipe(
      map((exercise) => exercise.filter((exercise) => !exercise.type))
    );

    // Custom Workouts
    this.customExercise$ = this.exerciseService.entities$.pipe(
      map((exercise) => exercise.filter((exercise) => exercise.type))
    );
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
    this.commonService.openSnackBar(`${exercise.name} workout is deleted`);
  }

  edit(exercise: Exercise) {
    this.openDialog(exercise);
  }
}
