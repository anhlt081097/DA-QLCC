import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsPieSuachuaComponent } from './echarts-pie-suachua.component';

describe('EchartsPieSuachuaComponent', () => {
  let component: EchartsPieSuachuaComponent;
  let fixture: ComponentFixture<EchartsPieSuachuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsPieSuachuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsPieSuachuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
