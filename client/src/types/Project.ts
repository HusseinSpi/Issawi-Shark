import { User } from "./User";

export interface Project {
  title: string;
  description: string;
  categories: string[];
  github: string;
  owner: User;
  rating: number;
  date: string;
  technologies: string[];
  status: string;
  teamMembers: User[];
}
