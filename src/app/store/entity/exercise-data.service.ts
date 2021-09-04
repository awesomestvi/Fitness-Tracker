import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { Exercise } from "src/app/training/exercise.model";

@Injectable({
  providedIn: "root",
})
export class ExerciseDataService extends DefaultDataService<Exercise> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Exercise", http, httpUrlGenerator);
  }

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(
      "https://vishals-fitness-tracker-api.herokuapp.com/api/exercises"
    );
  }
}
