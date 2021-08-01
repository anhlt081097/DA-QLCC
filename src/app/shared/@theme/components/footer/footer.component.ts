import { Component, OnInit } from "@angular/core";
@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <span class="created-by">
      Được tạo bởi <b><a target="_blank">DA-QLCC</a></b> 2021
    </span>
    <div class="socials">
      <a class="ion ion-social-github"></a>
      <a class="ion ion-social-facebook"></a>
      <a class="ion ion-social-twitter"></a>
      <a class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
