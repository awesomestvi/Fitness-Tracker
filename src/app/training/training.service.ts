import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { Training } from "./training.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { CommonService } from "../shared/common.service";
import { Store } from "@ngrx/store";
import * as fromRoot from "../app.reducer";
import * as UI from "../shared/ui.actions";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  private currentTraining: Training | undefined | null;
  public onGoingTrainingSubject = new BehaviorSubject<boolean>(false);
  onGoingTraining$: Observable<boolean> =
    this.onGoingTrainingSubject.asObservable();

  finishedExercisesChanged = new BehaviorSubject<Training[]>([]);

  private allSubs: Subscription[] = [];

  constructor(
    private firestore: AngularFirestore,
    private commonService: CommonService,
    private store: Store<fromRoot.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());

    const availableExercises$ = this.firestore
      .collection("availableExercise")
      .snapshotChanges()
      .pipe(
        map((collections) =>
          collections.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as any),
            };
          })
        ),
        tap(() => this.store.dispatch(new UI.StopLoading())),
        shareReplay()
      );

    return availableExercises$;
  }

  fetchPastExercises() {
    this.store.dispatch(new UI.StartLoading());
    const finishedTraining$: Observable<Training[]> = this.firestore
      .collection("finishedExercises")
      .snapshotChanges()
      .pipe(
        map((collections) =>
          collections.map((doc) => {
            return {
              ...(doc.payload.doc.data() as any),
              id: doc.payload.doc.id,
            };
          })
        ),
        shareReplay()
      ) as Observable<Training[]>;

    this.allSubs.push(
      finishedTraining$.subscribe({
        next: (exercises) => {
          this.finishedExercisesChanged.next(exercises);
        },
        error: (err) => this.store.dispatch(new UI.StopLoading()),
        complete: () => this.store.dispatch(new UI.StopLoading()),
      })
    );
  }

  private sendDatatoDatabase(exercise: Training) {
    this.firestore.collection("finishedExercises").add(exercise);
  }

  deleteRow(exercise: Training) {
    this.firestore.collection("finishedExercises").doc(exercise.id).delete();
    this.commonService.openSnackBar(`${exercise.name} exercise is deleted`);
  }

  getCurrentTraining() {
    return { ...this.currentTraining };
  }

  setCurrentTraining(exercise: Training | null) {
    this.currentTraining = exercise;
  }

  getCurrentTrainingName() {
    return this.currentTraining?.name;
  }

  getCurrentTrainingIcon() {
    return this.currentTraining?.icon;
  }

  getCurrentTrainingDuration() {
    return this.currentTraining?.duration || 0;
  }

  finishedExercise(state: any, progress?: number) {
    const finishedExercise = {
      ...this.currentTraining,
      date: new Date(),
      state: state,
      duration: progress
        ? this.currentTraining.duration * (progress / 100)
        : this.currentTraining.duration,
      calories: progress
        ? this.currentTraining.calories *
          this.currentTraining.duration *
          (progress / 100)
        : this.currentTraining.calories * this.currentTraining.duration,
    };

    this.sendDatatoDatabase(finishedExercise);

    // Show feedback
    this.commonService.openSnackBar(
      `${finishedExercise.name} workout is ${state}`
    );

    // Clear current exercise
    this.onGoingTrainingSubject.next(false);
    this.setCurrentTraining(null);
  }

  cancelAllSubs() {
    this.allSubs.forEach((subs) => subs?.unsubscribe());
  }
}
