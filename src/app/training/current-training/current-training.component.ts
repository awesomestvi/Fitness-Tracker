import { Component, OnInit } from "@angular/core";
import { TrainingService } from "../training.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(
    public trainingService: TrainingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    const duration =
      (this.trainingService.getCurrentTrainingDuration() / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress === 100) {
        clearInterval(this.timer);
        this.trainingService.finishedExercise("completed");
      }
    }, duration);
  }

  onStop() {
    clearInterval(this.timer);
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        progress: this.progress,
        exercise: this.trainingService.getCurrentTraining(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.finishedExercise("cancelled", this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
