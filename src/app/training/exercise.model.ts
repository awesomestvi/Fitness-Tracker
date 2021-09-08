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
