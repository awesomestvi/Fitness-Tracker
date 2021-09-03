import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { ExerciseEntityService } from "../store/entity/exercise-entity.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  loading$: Observable<boolean>;

  constructor(
    private snackBar: MatSnackBar,
    private exerciseService: ExerciseEntityService
  ) {
    this.loading$ = this.exerciseService.loading$;
  }

  openSnackBar(
    message: string,
    duration?: number,
    vPos?: MatSnackBarVerticalPosition | undefined
  ) {
    this.snackBar.open(message, undefined, {
      duration: duration ? duration : 3000,
      verticalPosition: vPos ? vPos : "bottom",
    });
  }
}
