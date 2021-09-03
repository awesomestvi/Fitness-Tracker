export interface Exercise {
  id: number;
  seqNo: number;
  name: string;
  category: "BEGINNER" | "ADVANCED";
  duration: number;
  calories: number;
  iconName?: string;
  date?: Date | string;
  state?: "completed" | "cancelled" | null;
}
