import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanVienComponent } from './nhan-vien.component';

describe('NhanVienComponent', () => {
  let component: NhanVienComponent;
  let fixture: ComponentFixture<NhanVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhanVienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
