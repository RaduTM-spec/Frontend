import {User} from "./user";

export interface Activity {
  name: string

  creator: User
  deadline: string
}
