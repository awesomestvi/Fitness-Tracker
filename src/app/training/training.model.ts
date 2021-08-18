export interface Training {
  id: string;
  name: string;
  duration: number;
  calories: number;
  icon?: string;
  date?: Date | string;
  state?: "completed" | "cancelled" | null;
}
