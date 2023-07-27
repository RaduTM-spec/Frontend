import {User} from "./user";

export interface TeamDetails {
  members: User[]
  membersNum: number
  gradesPerMember: number[]
  attendancesPerMember: number[]
  teamGrade: number
}
