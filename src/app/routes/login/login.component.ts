import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  async googleLogin(): Promise<void> {
    try {
      await this.auth.googleSignIn();

    } catch (e) {
      console.log(e);
    }
  }

}
