import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintHoadonComponent } from './print-hoadon.component';

describe('PrintHoadonComponent', () => {
  let component: PrintHoadonComponent;
  let fixture: ComponentFixture<PrintHoadonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintHoadonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintHoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
