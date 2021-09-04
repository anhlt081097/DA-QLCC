import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaikhoanComponent } from './add-taikhoan.component';

describe('AddTaikhoanComponent', () => {
  let component: AddTaikhoanComponent;
  let fixture: ComponentFixture<AddTaikhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaikhoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
