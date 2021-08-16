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
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress === 100) clearInterval(this.timer);
    }, 330);
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
        this.trainingService.onGoingTraining.next(false);
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
