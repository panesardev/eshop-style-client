import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/utils/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('sidebar') sidebar: ElementRef;

  user: User = { } as User;

  constructor(public auth: AuthService, public cartService: CartService) { 
    this.auth.user$.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }
  
  open(): void {
    this.sidebar.nativeElement.style.transform = 'translateX(0%)';
  }

  close(): void {
    this.sidebar.nativeElement.style.transform = 'translateX(-100%)';
  }

}
