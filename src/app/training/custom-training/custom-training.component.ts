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
  isData: boolean;

  constructor(
    public dialogRef: MatDialogRef<CustomTrainingComponent>,
    private exerciseService: ExerciseEntityService,
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isData = !!Object.keys(this.data).length;
  }

  ngOnInit(): void {
    this.customExercise = this.fb.group({
      name: [this.isData ? this.data.name : "", [Validators.required]],
      iconURL: [this.isData ? this.data.iconURL : ""],
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
      name,
      id: this.isData ? this.data.id : 1,
      seqNo: this.isData ? this.data.seqNo : 1,
      user: this.authService.getUserId(),
    };

    if (this.isData) this.exerciseService.update(exercise);
    if (!this.isData) this.exerciseService.add(exercise);
  }
}
