import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThecudanComponent } from './add-thecudan.component';

describe('AddThecudanComponent', () => {
  let component: AddThecudanComponent;
  let fixture: ComponentFixture<AddThecudanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThecudanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThecudanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
