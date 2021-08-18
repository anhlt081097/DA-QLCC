import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDichVuCoDinhComponent } from './add-dich-vu-co-dinh.component';

describe('AddDichVuCoDinhComponent', () => {
  let component: AddDichVuCoDinhComponent;
  let fixture: ComponentFixture<AddDichVuCoDinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDichVuCoDinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDichVuCoDinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
