import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { switchMap, tap } from 'rxjs/operators';
import {catchError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {}

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

  isMentor(): boolean {
    return this.isNewUser() && this.loginForm.get('role')?.value === 'MENTOR';
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

  onSubmit(): void {
    if (this.loginForm.invalid) {
      console.log("Invalid login form!");
      return;
    }

    const username = this.loginForm.get('username')?.value;
    if (this.isNewUser()) {
      const role = this.loginForm.get('role')?.value;
      const teamName = this.loginForm.get('teamName')?.value;
      const create = this.loginForm.get('create')?.value;
      const activityName = this.loginForm.get('activityName')?.value;
      const dueDate = this.loginForm.get('dueDate')?.value;

      let loginObservable;

      if (role === 'MENTOR') {
        loginObservable = this.authService.loginNewMentor(username, create, activityName, dueDate);
      } else if (role === 'TEAM LEAD') {
        loginObservable = this.authService.loginNewLead(username, teamName);
      } else {
        loginObservable = this.authService.loginNewMember(username, teamName);
      }

      loginObservable.pipe(
        tap((response) => {
          console.log("User logged in:", response);
          this.onLoginSuccess();
        }),
        catchError((error) => {
          console.error("User login error:", error);
          // We will see what we do about errors here.
          return [];
        })
      ).subscribe();

    } else {

      this.authService.loginExistingUser(username).pipe(
        tap((response) => {
          console.log("Existing user logged in:", response);
          this.onLoginSuccess();
        }),
        catchError((error) => {
          console.error("Existing user login error:", error);
          // Here too.. :P
          return [];
        })
      ).subscribe();
    }
  }

  onLoginSuccess() {
    this.authService.temporaryLogin();
    this.router.navigate(['/activity-teams']);
  }
}
