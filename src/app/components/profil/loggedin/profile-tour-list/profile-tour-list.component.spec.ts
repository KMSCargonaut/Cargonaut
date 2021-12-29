import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTourListComponent } from './profile-tour-list.component';

describe('ProfileTourListComponent', () => {
  let component: ProfileTourListComponent;
  let fixture: ComponentFixture<ProfileTourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTourListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
