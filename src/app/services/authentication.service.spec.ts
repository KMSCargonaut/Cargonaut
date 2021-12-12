import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import firebase from "firebase/compat/app";


describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
