import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaikhoanCanhoComponent } from './add-taikhoan-canho.component';

describe('AddTaikhoanCanhoComponent', () => {
  let component: AddTaikhoanCanhoComponent;
  let fixture: ComponentFixture<AddTaikhoanCanhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaikhoanCanhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaikhoanCanhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
