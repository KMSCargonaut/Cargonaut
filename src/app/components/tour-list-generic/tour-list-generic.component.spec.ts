import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourListGenericComponent } from './tour-list-generic.component';

describe('TourListGenericComponent', () => {
  let component: TourListGenericComponent;
  let fixture: ComponentFixture<TourListGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourListGenericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourListGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
