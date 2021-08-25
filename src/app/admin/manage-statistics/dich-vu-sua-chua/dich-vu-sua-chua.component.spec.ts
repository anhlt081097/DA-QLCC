import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DichVuSuaChuaComponent } from './dich-vu-sua-chua.component';

describe('DichVuSuaChuaComponent', () => {
  let component: DichVuSuaChuaComponent;
  let fixture: ComponentFixture<DichVuSuaChuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DichVuSuaChuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DichVuSuaChuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
