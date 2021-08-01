import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDichvuComponent } from './add-dichvu.component';

describe('AddDichvuComponent', () => {
  let component: AddDichvuComponent;
  let fixture: ComponentFixture<AddDichvuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDichvuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDichvuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
