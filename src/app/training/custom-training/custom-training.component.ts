import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/auth.service";
import { ExerciseEntityService } from "src/app/store/entity/exercise-entity.service";
import { Exercise } from "../exercise.model";

@Component({
  selector: "app-custom-training",
  templateUrl: "./custom-training.component.html",
  styleUrls: ["./custom-training.component.scss"],
})
export class CustomTrainingComponent implements OnInit {
  customExercise!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CustomTrainingComponent>,
    private exerciseService: ExerciseEntityService,
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const data = !!Object.keys(this.data).length;

    this.customExercise = this.fb.group({
      name: [data ? this.data.name : "", [Validators.required]],
      iconURL: [data ? this.data.iconURL : ""],
      duration: [data ? this.data.duration : "30", Validators.required],
      calories: [data ? this.data.calories : "2", Validators.required],
    });
  }

  onSave() {
    let name = this.customExercise?.value?.name;
    name = name[0].toUpperCase() + name.slice(1);

    const exercise: Exercise = {
      ...this.customExercise?.value,
      name,
      id: 1,
      seqNo: 1,
      user: this.authService.getUserId(),
    };

    const data = !!Object.keys(this.data).length;
    if (data) this.exerciseService.update(exercise);
    if (!data) this.exerciseService.add(exercise);
  }
}
