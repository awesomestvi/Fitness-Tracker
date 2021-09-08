import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { ExerciseEntityService } from "../store/entity/exercise-entity.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  loading$: Observable<boolean>;

  constructor(private snackBar: MatSnackBar, private exerciseService: ExerciseEntityService) {
    this.loading$ = this.exerciseService.loading$;
  }

  openSnackBar(message: string, duration?: number, vPos?: MatSnackBarVerticalPosition | undefined) {
    this.snackBar.open(message, undefined, {
      duration: duration ? duration : 3000,
      verticalPosition: vPos ? vPos : "bottom",
    });
  }

  testImage(URL: any) {
    const img = new Image();
    img.onload = this.checkImage;
    img.onerror = this.checkImage;
    img.src = URL;
  }

  checkImage(e: any) {
    if (e.type == "load") return "load";
    if (e.type == "error") return "error";
    return "";
  }
}
