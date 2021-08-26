import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoPhanComponent } from './add-bo-phan.component';

describe('AddBoPhanComponent', () => {
  let component: AddBoPhanComponent;
  let fixture: ComponentFixture<AddBoPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoPhanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
