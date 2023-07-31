import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserTeamDTO} from "../models/user-team-dto";

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
    id: 1,
    name: "john_doe",
    role: "TEAM LEAD",
    attendances: 20,
    grade: 9.5,
    pictureUrl: "https://robohash.org/john_doe?bgset=bg1"

  }

  public user: Observable<UserTeamDTO> | undefined;

  getLoggedUser() {
    return this.loggedUser;
  }


  private URL_PATH = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  authenticateUser(name: string): Observable<UserTeamDTO> {
    const USER_TEAM_URL = `${this.URL_PATH}/authenticate?name=${name}`;
    return this.http.post<UserTeamDTO>(USER_TEAM_URL, {title: `${name} logged in`});
  }

}
