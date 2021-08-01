import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-description-post',
  templateUrl: './description-post.component.html',
  styleUrls: ['./description-post.component.scss']
})
export class DescriptionPostComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data : string
  ) { }

  ngOnInit(): void { }


}
