import { Component } from '@angular/core';



@Component({
  selector: 'ngx-user-root',
  styleUrls: ['user.component.scss'],
  template: `
    <ngx-two-columns-layout>
      <router-outlet></router-outlet>
    </ngx-two-columns-layout>
  `,
})
export class UserComponent {



}
