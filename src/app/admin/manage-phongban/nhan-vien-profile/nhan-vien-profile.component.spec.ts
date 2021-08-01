import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanVienProfileComponent } from './nhan-vien-profile.component';

describe('NhanVienProfileComponent', () => {
  let component: NhanVienProfileComponent;
  let fixture: ComponentFixture<NhanVienProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhanVienProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanVienProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
