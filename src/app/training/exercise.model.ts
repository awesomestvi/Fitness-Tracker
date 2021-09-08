export interface Exercise {
  id: number;
  seqNo: number;
  name: string;
  duration: number;
  calories: number;
  iconName?: string;
  date?: Date | string;
  state?: "completed" | "cancelled" | null;
  user?: string;
  type?: "custom";
}

export function sortFinishedExercise(ex1: Exercise, ex2: Exercise) {
  return ex2.id - ex1.id;
}
