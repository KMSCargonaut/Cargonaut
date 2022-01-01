import {fakeAsync, TestBed} from '@angular/core/testing';
import { UserService } from './user.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subject} from "rxjs";
import {MockProvider} from "ng-mocks";
import {PROVIDED_FIREBASE_APPS} from "@angular/fire/app/app.module";

describe('UserService', () => {
  let service: UserService;
  let fireAuthService: AngularFireAuth;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [
        UserService,
        MockProvider(AngularFireAuth),
        MockProvider(PROVIDED_FIREBASE_APPS)
      ]
    }).compileComponents();
    service = TestBed.inject(UserService);
    fireAuthService = TestBed.inject(AngularFireAuth);
  });

  it('should executed login method with success', fakeAsync(() => {
    const googleSignInMethod = spyOn(fireAuthService, 'signInWithPopup');
    googleSignInMethod.and.returnValue(Promise.resolve({
      credential: null,
      user: null,
    }));

    service.login().subscribe((data) => {
      expect(googleSignInMethod).toHaveBeenCalled();
    });
  }));
});
