import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Training } from "../training.model";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { TrainingService } from "../training.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-past-trainings",
  templateUrl: "./past-trainings.component.html",
  styleUrls: ["./past-trainings.component.css"],
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns = [
    "image",
    "name",
    "duration&Calories",
    "duration",
    "calories",
    "date",
    "status",
    "actions",
  ];
  dataSource = new MatTableDataSource<Training>();
  dataSourceSubscription = new Subscription();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.dataSourceSubscription =
      this.trainingService.finishedExercisesChanged.subscribe(
        (exercises: Training[]) => {
          this.dataSource.data = exercises;
        }
      );
    this.trainingService.fetchPastExercises();
  }

  applyFilter(target: any) {
    this.dataSource.filter = target.value.trim().toLowerCase();
  }

  onDelete(exercise: Training) {
    this.trainingService.deleteRow(exercise);
  }

  ngOnDestroy() {
    this.dataSourceSubscription.unsubscribe();
  }
}
