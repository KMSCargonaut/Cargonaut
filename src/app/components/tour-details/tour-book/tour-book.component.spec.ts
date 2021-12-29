import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBookComponent } from './tour-book.component';

describe('TourBookComponent', () => {
  let component: TourBookComponent;
  let fixture: ComponentFixture<TourBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
