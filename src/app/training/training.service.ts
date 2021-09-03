import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Exercise } from "./exercise.model";
import { CommonService } from "../shared/common.service";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  private currentTraining: Exercise | undefined | null;
  public onGoingTrainingSubject = new BehaviorSubject<boolean>(false);
  onGoingTraining$: Observable<boolean> =
    this.onGoingTrainingSubject.asObservable();

  finishedExercisesChanged = new BehaviorSubject<Exercise[]>([]);

  private allSubs: Subscription[] = [];

  constructor(private commonService: CommonService) {}

  // fetchPastExercises() {
  //   // this.store.dispatch(new UI.StartLoading());
  //   const finishedTraining$: Observable<Exercise[]> = this.firestore
  //     .collection("finishedExercises")
  //     .snapshotChanges()
  //     .pipe(
  //       map((collections) =>
  //         collections.map((doc) => {
  //           return {
  //             ...(doc.payload.doc.data() as any),
  //             id: doc.payload.doc.id,
  //           };
  //         })
  //       ),
  //       shareReplay()
  //     ) as Observable<Exercise[]>;

  //   this.allSubs.push(
  //     finishedTraining$.subscribe({
  //       next: (exercises) => {
  //         this.finishedExercisesChanged.next(exercises);
  //       },
  //       // error: (err) => this.store.dispatch(new UI.StopLoading()),
  //       // complete: () => this.store.dispatch(new UI.StopLoading()),
  //     })
  //   );
  // }

  // private sendDatatoDatabase(exercise: Exercise) {
  //   this.firestore.collection("finishedExercises").add(exercise);
  // }

  // deleteRow(exercise: Exercise) {
  //   this.firestore
  //     .collection("finishedExercises")
  //     .doc(exercise.id.toString())
  //     .delete();
  //   this.commonService.openSnackBar(`${exercise.name} exercise is deleted`);
  // }

  getCurrentTraining() {
    return { ...this.currentTraining };
  }

  setCurrentTraining(exercise: Exercise | null) {
    this.currentTraining = exercise;
  }

  getCurrentTrainingName() {
    return this.currentTraining?.name;
  }

  getCurrentTrainingIcon() {
    return this.currentTraining?.iconName;
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

    //this.sendDatatoDatabase(finishedExercise);

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
