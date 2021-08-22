import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromRoot from "../app.reducer";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  loading$: Observable<boolean>;

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<fromRoot.State>
  ) {
    this.loading$ = this.store.select(fromRoot.getIsLoading);
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
