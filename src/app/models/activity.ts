import {User} from "./user";

export interface Activity {
  id: number
  name: string
  creator: User
  deadline: string
}
