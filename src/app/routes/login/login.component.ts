import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async googleLogin(): Promise<void> {
    try {
      await this.auth.googleSignIn();

    } catch (e) {
      console.log(e);
    }
  }

  async phone() {
    await this.userService.updatePhoneNumber('4372190390');
    await this.userService.updateAddress('41 Ozner Court, Brampton ON, Canada');
  }

}
