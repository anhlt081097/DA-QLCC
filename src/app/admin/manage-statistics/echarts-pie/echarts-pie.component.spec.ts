import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsPieComponent } from './echarts-pie.component';

describe('EchartsPieComponent', () => {
  let component: EchartsPieComponent;
  let fixture: ComponentFixture<EchartsPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
