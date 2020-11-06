import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  private user: User;

  constructor(private auth: AuthService) { 
    auth.user$.subscribe(user => this.user = user);
    localStorage['user-token'] = JSON.stringify({
      token: 'hviebgvjdngvjdt'
    });
  }

  async updatePhoneNumber(phoneNumber: string): Promise<void> {
    await this.auth.updateUser(this.user, this.user.address, phoneNumber);
  }

  async updateAddress(address: string): Promise<void> {
    await this.auth.updateUser(this.user, address, this.user.phoneNumber);
  }

}
