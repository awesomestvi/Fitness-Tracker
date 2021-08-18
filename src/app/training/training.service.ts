import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Training } from "./training.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  private currentTraining: Training | undefined | null;
  onGoingTraining = new Subject<Boolean>();
  finishedExercisesChanged = new Subject<Training[]>();

  constructor(
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  fetchAvailableExercises() {
    return this.firestore
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
        shareReplay()
      );
  }

  fetchPastExercises() {
    const finishedTraining$: Observable<Training[]> = this.firestore
      .collection("finishedExercises")
      .valueChanges() as Observable<Training[]>;

    finishedTraining$.subscribe((exercises) => {
      this.finishedExercisesChanged.next(exercises);
    });
  }

  private sendDatatoDatabase(exercise: Training) {
    this.firestore.collection("finishedExercises").add(exercise);
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

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
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
    this.openSnackBar(`${finishedExercise.name} workout is ${state}`);

    // Clear current exercise
    this.onGoingTraining.next(false);
    this.setCurrentTraining(null);
  }
}
