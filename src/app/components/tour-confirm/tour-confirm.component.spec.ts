import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourConfirmComponent } from './tour-confirm.component';

describe('TourConfirmComponent', () => {
  let component: TourConfirmComponent;
  let fixture: ComponentFixture<TourConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
