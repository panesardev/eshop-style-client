import { Injectable } from '@angular/core';
import { User, UserData } from '../models/user.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  private user: User;

  constructor(private auth: AuthService) { 
    auth.user$.subscribe(user => this.user = user);
  }

  async updateUser({ address, phoneNumber }: UserData): Promise<void> {
    await this.auth.updateUser(this.user, { address, phoneNumber });
  }

}
