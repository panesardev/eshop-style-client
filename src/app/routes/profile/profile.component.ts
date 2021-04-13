import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from 'src/app/models/order.interface';
import { User, UserData } from 'src/app/models/user.interface';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  orders$: Observable<Order[]>;
  user$: Observable<User>;
  userInfo: UserData = {} as UserData;

  constructor(
    private orderService: OrderService,
    private auth: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.user$ = this.auth.user$;
    this.orders$ = this.user$.pipe(
      switchMap(user => {
        this.userInfo = user;
        return this.orderService.findByEmail(user.email);
      })
    );
  }

  async updateProfile(): Promise<void> {
    await this.userService.updateUser(this.userInfo);
    this.toastr.success('Profile Updated!', '', {
      timeOut: 1000,
    });
  }

  orderUpdate(): void {
    this.orders$ = this.user$.pipe(
      switchMap(user => this.orderService.findByEmail(user.email))
    );
  }

}
