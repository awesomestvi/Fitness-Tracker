import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { ExerciseEntityService } from "../store/entity/exercise-entity.service";

@Injectable()
export class ExercisesResolver implements Resolve<boolean> {
  constructor(private exerciseService: ExerciseEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.exerciseService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) this.exerciseService.getAll();
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
