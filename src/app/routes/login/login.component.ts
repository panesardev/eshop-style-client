import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    try {
      await this.auth.signIn(this.email, this.password);
    } catch (e) {
      this.error = e.message;
    }
  } 

  async googleLogin(): Promise<void> {
    try {
      await this.auth.googleSignIn();
    } catch (e) {
      this.error = e.message;
    }
  }

}
