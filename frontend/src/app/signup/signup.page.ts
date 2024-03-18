// signup.page.ts
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  signUp() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.userService.signUp(userData).subscribe(
      response => {
        console.log('Signup successful:', response);
        // Redirect to login page or any other page
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error signing up:', error);
        this.errorMessage = 'Error signing up. Please try again later.';
      }
    );
  }
}
