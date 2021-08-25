import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsPieDichvuComponent } from './echarts-pie-dichvu.component';

describe('EchartsPieDichvuComponent', () => {
  let component: EchartsPieDichvuComponent;
  let fixture: ComponentFixture<EchartsPieDichvuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsPieDichvuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsPieDichvuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
