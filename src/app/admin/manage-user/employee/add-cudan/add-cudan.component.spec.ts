import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCudanComponent } from './add-cudan.component';

describe('AddCudanComponent', () => {
  let component: AddCudanComponent;
  let fixture: ComponentFixture<AddCudanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCudanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCudanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
