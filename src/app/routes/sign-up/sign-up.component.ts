import { Component, OnInit } from '@angular/core';
import { SignupUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: SignupUser = new SignupUser();
  error: string;
  
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  async signUp(): Promise<void> {
    try {
      await this.auth.signUp(this.user);
    } catch (e) {
      this.error = e.message
    }
  }

  async googleLogin(): Promise<void> {
    try {
      await this.auth.googleSignIn();
    } catch (e) {
      this.error = e.message
    }
  }
}
