import {User} from "./user";

export interface TeamDetails {
  members: User[]
  gradesPerMember: number[]
  attendancesPerMember: number[]
  teamGrade: number
}
