import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddXecoComponent } from './add-xeco.component';

describe('AddXecoComponent', () => {
  let component: AddXecoComponent;
  let fixture: ComponentFixture<AddXecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddXecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddXecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
