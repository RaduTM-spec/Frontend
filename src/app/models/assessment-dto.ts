
import { User } from './user';
import { Activity } from './activity';

export interface AssessmentDTO {
  id: number;
  title: string;
  activity: Activity;
  mentor: User;
  user: User;
  grade: number;
  attended: boolean;
  comment: string;
}
