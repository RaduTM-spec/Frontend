import {Injectable} from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected usersList: User[] = [{
      id: 1,
      name: "john_doe",
      role: "TEAM LEAD",
      attendances: 20,
      grade: 9.5,
      pictureUrl: "https://robohash.org/john_doe?bgset=bg1"
    },
    {
      id: 2,
      name: "daniel_black",
      role: "MEMBER",
      attendances: 11,
      grade: 8.5,
      pictureUrl: "https://robohash.org/hehehe?bgset=bg1"
    },
    {
      id: 3,
      name: "vasile",
      role: "mentor",
      attendances: 20,
      grade: 10,
      pictureUrl: "https://robohash.org/hehehe?bgset=bg1"
    }];

  protected loggedUser: User = {
    id: 3,
    name: "vasile",
    role: "mentor",
    attendances: 20,
    grade: 10,
    pictureUrl: "https://robohash.org/hehehe?bgset=bg1"

  }

  getLoggedUser() {
    return this.loggedUser;
  }


}
