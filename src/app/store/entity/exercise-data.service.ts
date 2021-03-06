import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { API_ENDPOINT } from "src/app/shared/config";
import { Exercise } from "src/app/training/exercise.model";
import { Update } from "@ngrx/entity";

@Injectable({
  providedIn: "root",
})
export class ExerciseDataService extends DefaultDataService<Exercise> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Exercise", http, httpUrlGenerator);
  }

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${API_ENDPOINT}/api/exercises`);
  }

  add(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${API_ENDPOINT}/api/custom`, exercise);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${API_ENDPOINT}/api/custom/${id}`);
  }

  update(exercise: Update<Exercise>): Observable<Exercise> {
    return this.http.put<Exercise>(`${API_ENDPOINT}/api/exercise/${exercise.id}`, exercise.changes);
  }
}
