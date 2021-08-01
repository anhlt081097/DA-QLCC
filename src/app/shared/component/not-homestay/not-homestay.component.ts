import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'ngx-not-homestay',
  templateUrl: './not-homestay.component.html',
  styleUrls: ['./not-homestay.component.scss']
})
export class NotHomestayComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl("/login");
  }

}
