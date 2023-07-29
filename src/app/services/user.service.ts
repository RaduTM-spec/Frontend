import { Injectable } from '@angular/core';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected usersList: User[] = [{
    id: 1,
    username: "john_doe",
    role: "TEAM LEAD",
    attendances: 20,
    grade: 9.5,
    imageUrl: "https://robohash.org/john_doe?bgset=bg1"
  },
    {
      id: 2,
      username: "jane_smith",
      role: "MEMBER",
      attendances: 15,
      grade: 8.5,
      imageUrl: "https://robohash.org/bruhdh?bgset=bg1"
    },
    {
      id: 3,
      username: "mike_johnson",
      role: "MEMBER",
      attendances: 10,
      grade: 7.5,
      imageUrl: "https://robohash.org/asdasdaaaa?bgset=bg1"
    },
    {
      id: 4,
      username: "bob_williams",
      role: "MEMBER",
      attendances: 5,
      grade: 4.5,
      imageUrl: "https://robohash.org/asdasdasd?bgset=bg1"
    },
    {
      id: 5,
      username: "david_brown",
      role: "MEMBER",
      attendances: 12,
      grade: 9.5,
      imageUrl: "https://robohash.org/hehehe?bgset=bg1"
    },
    {
      id: 6,
      username: "emily_clark",
      role: "MEMBER",
      attendances: 8,
      grade: 6.5,
      imageUrl: "https://robohash.org/idk-bruh-idk?bgset=bg1"
    },
    {
      id: 7,
      username: "sam_smith",
      role: "MEMBER",
      attendances: 3,
      grade: 6.5,
      imageUrl: "https://robohash.org/randomphoto?bgset=bg1"
    },
    {
      id: 8,
      username: "daniel_black",
      role: "MEMBER",
      attendances: 11,
      grade: 8.5,
      imageUrl: "https://robohash.org/hehehe?bgset=bg1"
    },
    {
      id: 9,
      username: "vasile",
      role: "mentor",
      attendances: 20,
      grade: 10,
      imageUrl: "https://robohash.org/hehehe?bgset=bg1"
    }];

  protected loggedUser: User = {
    id: 8,
    username: "daniel_black",
    role: "MEMBER",
    attendances: 11,
    grade: 8.5,
    imageUrl: "https://robohash.org/hehehe?bgset=bg1"
  }

  getLoggedUser(){
    return this.loggedUser;
  }
  getAllUsers(): User[] {
    return this.usersList;
  }




}
