import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { catchError, map, take, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { CommonService } from "src/app/shared/common.service";
import { ExerciseEntityService } from "src/app/store/entity/exercise-entity.service";
import { FinishedEntityService } from "src/app/store/entity/finished-entity.service";
import { Exercise } from "../exercise.model";

@Component({
  selector: "app-custom-training",
  templateUrl: "./custom-training.component.html",
  styleUrls: ["./custom-training.component.scss"],
})
export class CustomTrainingComponent implements OnInit {
  customExercise!: FormGroup;
  isData: boolean;

  constructor(
    public dialogRef: MatDialogRef<CustomTrainingComponent>,
    private exerciseService: ExerciseEntityService,
    private fb: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService,
    private finishedExercise: FinishedEntityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isData = !!Object.keys(this.data).length;
  }

  ngOnInit(): void {
    this.customExercise = this.fb.group({
      name: [this.isData ? this.data.name : "", [Validators.required]],
      duration: [this.isData ? this.data.duration : "30", Validators.required],
      calories: [this.isData ? this.data.calories : "2", Validators.required],
    });
  }

  onSave() {
    let name = this.customExercise?.value?.name;
    name = name[0].toUpperCase() + name.slice(1);

    const exercise: Exercise = {
      ...this.data,
      ...this.customExercise?.value,
      name, // Capitalising Name
      id: this.isData ? this.data.id : 0,
      seqNo: this.isData ? this.data.seqNo : 0,
      user: this.authService.getUserId(),
      iconName: "custom",
      type: "custom",
    };

    if (this.isData) {
      this.updateFinishedExercise(exercise);
      this.exerciseService.update(exercise);
      this.commonService.openSnackBar(`${exercise.name} workout is updated`);
    }
    if (!this.isData) {
      this.exerciseService.add(exercise);
      this.commonService.openSnackBar(`${exercise.name} workout is added`);
    }
  }

  updateFinishedExercise(exercise: Exercise) {
    this.finishedExercise.entities$
      .pipe(
        map((exercises) => exercises.find((exer) => exer.name === this.data.name)?.id),
        take(1)
      )
      .subscribe((id) => {
        id && this.finishedExercise.update({ ...exercise, id: id, seqNo: id });
      });
  }
}
