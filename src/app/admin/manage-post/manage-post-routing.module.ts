import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../../shared/component/not-found/not-found.component";
import { ManagePostComponent } from "./manage-post.component";
import { PostComponent } from "./post/post.component";
import { TypePostComponent } from "./type-post/type-post.component";

const routes: Routes = [
  {
    path: "",
    component: ManagePostComponent,
    children: [
      {
        path: "type-post",
        component: TypePostComponent,
      },
      {
        path: "post",
        component: PostComponent,
      },
      {
        path: "",
        redirectTo: "post",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePostRoutingModule {}
