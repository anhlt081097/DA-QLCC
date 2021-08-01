import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-confirm-account-email',
  templateUrl: './confirm-account-email.component.html',
  styleUrls: ['./confirm-account-email.component.css'],
})
export class ConfirmAccountEmailComponent implements OnInit {
  token: string;

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.activateRoute.snapshot.params.id;
    this.authService.confirmEmail(this.token).subscribe(
      (data) => {},
      (error) => {
        this.router.navigateByUrl('error/404');
        throwError(error);
      }
    );
  }
}
