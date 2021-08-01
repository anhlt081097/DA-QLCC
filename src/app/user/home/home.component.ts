import { Component, OnInit } from "@angular/core";
import { FeedBackResponse } from "../../shared/model/feed-back/feed-back-response";
import { FeedBackService } from "../../shared/service/feed-back.service";
import { throwError } from "rxjs";
import { HomeStayResponse } from "../../shared/model/home-stay/home-stay-response";
import { HomeStayService } from "../../shared/service/homestay.service";

export class Images {
  image: string;
  thumbImage: string;
}

export class ListImages {
  id: number;
  image: Images[];
}

@Component({
  selector: "ngx-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  feedBacks: FeedBackResponse[];
  listHomeStay: HomeStayResponse[];
  image: Images[] = [];
  listImage: ListImages[] = [];

  constructor(
    private feedBackService: FeedBackService,
    private homeStayService: HomeStayService
  ) {}

  ngOnInit(): void {
    // this.getAllFeedBack();
    // this.getAllHomeStay();
  }

  private getAllFeedBack() {
    this.feedBackService.getAllFeedBack().subscribe(
      (data) => {
        this.feedBacks = data.filter(
          (value) => value.rate === 4 || value.rate === 5
        );
      },
      (error) => {
        throwError(error);
      }
    );
  }

  getImage(id: number): string {
    this.image = this.listImage.find((options) => options.id === id).image;
    const image = this.image.map((value) => {
      return value.image;
    });
    return image[0];
  }

  getAllHomeStay() {
    this.homeStayService.getAllHomeStay().subscribe(
      (data) => {
        this.listHomeStay = data;
        this.listImage = data.map(function (item) {
          return { id: item.id, image: JSON.parse(item.image) };
        });
      },
      (error) => {
        throwError(error);
      }
    );
  }
}
