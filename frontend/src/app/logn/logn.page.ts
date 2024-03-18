import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logn',
  templateUrl: './logn.page.html',
  styleUrls: ['./logn.page.scss'],
})
export class LognPage {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // Make an HTTP request to your backend for authentication
    this.http.post<any>('http://localhost:3000/users/login', { username: this.username, password: this.password })
      .subscribe(
        response => {
          // If authentication is successful, save the token to local storage
          localStorage.setItem('token', response.token);
          // Redirect to another page or perform any other action
          console.log('login successful:', response);
          this.router.navigate(['/home']);
        },
        error => {
          // Handle authentication error (e.g., display error message)
          console.error('Authentication failed:', error);
        }
      );
  }
}