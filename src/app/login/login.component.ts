import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userType: ['existing', Validators.required],
      username: ['', Validators.required],
      role: ['MENTOR', Validators.required],
      teamName: ['', Validators.required],
      create: [false],
      activityName: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
    this.toggleUserType();
  }

  isNewUser(): boolean {
    return this.loginForm.get('userType')?.value === 'new';
  }

  isMemberOrLeader(): boolean {
    const role = this.loginForm.get('role')?.value;
    return this.isNewUser() && (role === 'MEMBER' || role === 'TEAM_LEADER');
  }
  isMemberOrLeaderComplete(){
    const username = this.loginForm.get('username')?.value;
    const teamName = this.loginForm.get('teamName')?.value;
    return username != '' && teamName != '';
  }

  isMentor(): boolean {
    return this.isNewUser() && this.loginForm.get('role')?.value === 'MENTOR';
  }
  isMentorComplete(){
    const username = this.loginForm.get('username')?.value;
    const activityName = this.loginForm.get('activityName')?.value;
    const dueDate = this.loginForm.get('dueDate')?.value;
    return username != '' && activityName != '' && dueDate != '';

  }

  setUserType(userType: string): void {
    this.loginForm.get('userType')?.setValue(userType);
    this.toggleUserType();
  }

  toggleUserType(): void {
    const userType = this.loginForm.get('userType')?.value;
    if (userType === 'existing') {
      this.loginForm.get('username')?.enable();
      this.loginForm.get('role')?.enable();
      this.loginForm.get('teamName')?.enable();
      this.loginForm.get('create')?.enable();
      this.loginForm.get('activityName')?.enable();
      this.loginForm.get('dueDate')?.enable();
    } else {
      this.loginForm.get('username')?.enable();
      this.loginForm.get('role')?.enable();
      this.loginForm.get('create')?.enable();

      this.loginForm.get('activityName')?.enable();
      this.loginForm.get('dueDate')?.enable();
      this.toggleRoleFields();
    }
  }

  toggleRoleFields(): void {
    if (this.isMemberOrLeader()) {
      this.loginForm.get('teamName')?.enable();
      this.loginForm.get('create')?.enable();
      this.loginForm.get('activityName')?.enable();
      this.loginForm.get('dueDate')?.enable();
    } else if (this.isMentor()) {
      this.loginForm.get('teamName')?.enable();
      this.loginForm.get('create')?.enable();
      this.loginForm.get('activityName')?.enable();
      this.loginForm.get('dueDate')?.enable();
    }
  }

  async onLoginSuccess() {
    if (this.loginForm.get('username')?.value != '') {

      const observable$ = this.authService.authenticateUser(this.loginForm.get('username')?.value)
      observable$.subscribe(
        loggedUser => this.authService.loggedUser = loggedUser
      )
      await this.authService.delay(200);
      await this.router.navigate(['/user-assessments'],);
    }
  }
  async onRegisterSuccess() {
    if (this.isMentor() && this.isMentorComplete()) {
      const username = this.loginForm.get('username')?.value;
      const create = this.loginForm.get('create')?.value;
      const activityName = this.loginForm.get('activityName')?.value;
      const dueDate = this.loginForm.get('dueDate')?.value;

      const observable$ = this.authService.loginNewMentor(username,create,activityName,dueDate)
      observable$.subscribe(
        loggedUser => this.authService.loggedUser = loggedUser
      )
      await this.authService.delay(200);
      await this.router.navigate(['/user-assessments'],);

    } else if (this.isMemberOrLeader() && this.isMemberOrLeaderComplete()) {
      const username = this.loginForm.get('username')?.value;
      const teamName = this.loginForm.get('teamName')?.value;
      const role = this.loginForm.get('role')?.value;

      if(role == 'MEMBER'){
        const observable$ = this.authService.loginNewMember(username,teamName)
        observable$.subscribe(
          loggedUser => this.authService.loggedUser = loggedUser
        )
      }
      else{
        const observable$ = this.authService.loginNewLead(username,teamName)
        observable$.subscribe(
          loggedUser => this.authService.loggedUser = loggedUser
        )
      }

      await this.authService.delay(200);
      await this.router.navigate(['/user-assessments'],);

    }
  }
}
