import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNhanVienComponent } from './add-nhan-vien.component';

describe('AddNhanVienComponent', () => {
  let component: AddNhanVienComponent;
  let fixture: ComponentFixture<AddNhanVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNhanVienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
