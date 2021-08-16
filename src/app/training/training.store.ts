import { Training } from "./training.model";

class TrainingStore {
  availableExercise: Training[] = [
    {
      id: "lunges",
      name: "Lunges",
      duration: 30,
      calories: 4,
      icon: "../../../assets/img/lunges.png",
    },
    {
      id: "cycling",
      name: "Cycling",
      duration: 300,
      calories: 10,
      icon: "../../../assets/img/cycling.png",
    },
    {
      id: "burpees",
      name: "Burpees",
      duration: 60,
      calories: 8,
      icon: "../../../assets/img/burpees.png",
    },
    {
      id: "highKnees",
      name: "High Knees",
      duration: 45,
      calories: 6,
      icon: "../../../assets/img/high-knees.png",
    },
  ];
}

export default new TrainingStore();
