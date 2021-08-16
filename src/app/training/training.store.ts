import { Workouts } from "./training.model";

class WorkoutStore {
  workouts: Workouts[] = [
    {
      value: "lunges",
      type: "Lunges",
      icon: "../../../assets/img/lunges.png",
    },
    {
      value: "cycling",
      type: "Cycling",
      icon: "../../../assets/img/cycling.png",
    },
    {
      value: "burpees",
      type: "Burpees",
      icon: "../../../assets/img/burpees.png",
    },
    {
      value: "highKnees",
      type: "High Knees",
      icon: "../../../assets/img/high-knees.png",
    },
  ];
}

export default new WorkoutStore();
