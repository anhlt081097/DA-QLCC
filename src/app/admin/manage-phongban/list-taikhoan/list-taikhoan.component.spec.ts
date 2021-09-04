import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaikhoanComponent } from './list-taikhoan.component';

describe('ListTaikhoanComponent', () => {
  let component: ListTaikhoanComponent;
  let fixture: ComponentFixture<ListTaikhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaikhoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
