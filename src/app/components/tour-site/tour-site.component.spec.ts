import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourSiteComponent } from './tour-site.component';

describe('TourSiteComponent', () => {
  let component: TourSiteComponent;
  let fixture: ComponentFixture<TourSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
