import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDichvuComponent } from './detail-dichvu.component';

describe('DetailDichvuComponent', () => {
  let component: DetailDichvuComponent;
  let fixture: ComponentFixture<DetailDichvuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDichvuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDichvuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
