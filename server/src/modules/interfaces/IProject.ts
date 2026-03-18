export default interface IProject {
  id: number;
  title: string;
  description: string | null;
  created_at: Date | string;
}
