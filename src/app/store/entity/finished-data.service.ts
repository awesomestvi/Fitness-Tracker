import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { API_ENDPOINT } from "src/app/shared/config";
import { Exercise } from "src/app/training/exercise.model";
import { Update } from "@ngrx/entity";

@Injectable({
  providedIn: "root",
})
export class FinishedDataService extends DefaultDataService<Exercise> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private authService: AuthService) {
    super("FinishedExercise", http, httpUrlGenerator);
  }

  add(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${API_ENDPOINT}/api/exercise`, exercise);
  }

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${API_ENDPOINT}/api/finished/${this.authService.getUserId()}`);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${API_ENDPOINT}/api/finished/${id}`);
  }

  update(exercise: Update<Exercise>): Observable<Exercise> {
    return this.http.put<Exercise>(`${API_ENDPOINT}/api/finished/${exercise.id}`, exercise.changes);
  }
}
