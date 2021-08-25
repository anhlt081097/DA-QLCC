import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DichVuCoDinhComponent } from './dich-vu-co-dinh.component';

describe('DichVuCoDinhComponent', () => {
  let component: DichVuCoDinhComponent;
  let fixture: ComponentFixture<DichVuCoDinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DichVuCoDinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DichVuCoDinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
