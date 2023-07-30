import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // @Input() loggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userType: ['existing', Validators.required],
      username: [''], // No validators needed for existing users
      role: ['MENTOR', Validators.required],
      teamName: ['', Validators.required],
      create: [false],
      activityName: [''],
      dueDate: ['']
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
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      console.log("Invalid login form!")
      return;
    }

    if (this.isNewUser()) {
      console.log("Registered")
    } else {
      console.log("Logged in")
    }
    this.onLoginSuccess();
  }

  onLoginSuccess() {
    this.router.navigate(['/activity-teams']);
    this.authService.login("");
  }
}
