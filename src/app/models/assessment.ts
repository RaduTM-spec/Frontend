import {Activity} from "./activity";
import {User} from "./user";

export interface Assessment {
  id: number
  title: string
  activity: Activity
  mentor: User
  user: User
  grade: number
  attended: boolean
  comment: number
}
