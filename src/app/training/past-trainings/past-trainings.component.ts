import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Exercise } from "../exercise.model";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { TrainingService } from "../training.service";
import { Subscription } from "rxjs";
import { FinishedEntityService } from "src/app/store/entity/finished-entity.service";

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
  dataSource = new MatTableDataSource<Exercise>();
  dataSourceSubscription = new Subscription();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private trainingService: TrainingService,
    private finishedExerciseService: FinishedEntityService
  ) {}

  ngOnInit(): void {
    this.dataSourceSubscription =
      this.finishedExerciseService.entities$.subscribe(
        (exercises: Exercise[]) => {
          this.dataSource.data = exercises;
        }
      );
  }

  applyFilter(target: any) {
    this.dataSource.filter = target.value.trim().toLowerCase();
  }

  onDelete(exercise: Exercise) {
    this.trainingService.deleteRow(exercise);
  }

  ngOnDestroy() {
    this.dataSourceSubscription.unsubscribe();
  }
}
