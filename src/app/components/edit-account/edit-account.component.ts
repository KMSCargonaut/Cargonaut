import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit{

  constructor(public activeModal: NgbActiveModal, public userData: UserService, public alertData: AlertService) {
  }

  ngOnInit() {
    if (this.userData.user) {
      this.email = (this.userData.user.email) ? this.userData.user.email : '';
    }
  }

  // ModelBinding
  public email = '';
  public password = '';
  public repeatPassword = '';


  // PropertyBinding for outline color for wrong/no inputs
  public wrongEmailClass = '';
  public wrongPasswordClass = '';
  public wrongRepeatPasswordClass = '';

  // Message color
  public emailColor = '';
  public passwordColor = '';

  // Message for wrong/no inputs
  public emailMessage = '';
  public passwordMessage = '';
  public passwordRepeatMessage = '';


  async inputEmail() {
    if (this.email.trim().length > 0) {
      try {
        await this.userData.updateEmail(this.email);
        this.wrongEmailClass = 'border-success';
        this.emailMessage = 'E-Mail erfolgreich geändert';
        this.emailColor = 'text-success';
      } catch (err) {
        if (err.code === 'auth/invalid-email') {
          this.emailMessage = 'E-Mail ist nicht richtig formatiert';
          this.wrongEmailClass = 'border-danger';
          this.emailColor = 'text-danger';
        }
        if (err.code === 'auth/requires-recent-login') {
          this.alertData.showAlert({type: 'danger', message: 'Sie müssen sich erneut anmelden, um diese Aktion durchzuführen'})
          this.activeModal.dismiss();
        }
      }
    } else {
      this.emailMessage = 'Geben Sie Ihre E-Mail an';
      this.wrongEmailClass = 'border-danger';
      this.emailColor = 'text-danger';
    }
  }

  async inputPassword() {
    if (this.password.trim().length > 0 &&
      this.password === this.repeatPassword) {
      try {
        await this.userData.updatePassword(this.password);
        this.wrongPasswordClass = 'border-success';
        this.wrongRepeatPasswordClass = 'border-success';
        this.passwordColor = 'text-success';
        this.passwordRepeatMessage = 'Passwort erfolgreich geändert'
      } catch (err) {
        if (err.code === 'auth/weak-password') {
          this.passwordMessage = 'Das Passwort ist zu kurz';
          this.wrongPasswordClass = 'border-danger';
          this.passwordColor = 'text-danger';
        }
        if (err.code === 'auth/requires-recent-login') {
          this.alertData.showAlert({
            type: 'danger',
            message: 'Sie müssen sich erneut anmelden, um diese Aktion durchzuführen'
          })
          this.activeModal.dismiss();
        }
      }
    } else {
      if (this.password.trim().length === 0) {
        this.passwordMessage = 'Geben Sie ein Passwort an';
        this.wrongPasswordClass = 'border-danger';
        this.passwordColor = 'text-danger';
      }
      if (this.repeatPassword.trim().length === 0) {
        this.passwordRepeatMessage = 'Wiederholen Sie Ihr Passwort';
        this.wrongRepeatPasswordClass = 'border-danger';
        this.passwordColor = 'text-danger';
      }
      if (this.repeatPassword !== this.password) {
        this.passwordRepeatMessage = 'Die Passwörter sind nicht identisch';
        this.wrongRepeatPasswordClass = 'border-danger';
        this.passwordColor = 'text-danger';
      }
    }
  }


  public validEmail(input: string): void {
    if (input.trim().length >= 0) {
      this.emailMessage = '';
      this.wrongEmailClass = '';
    }
  }

  public validPassword(input: string): void {
    if (input.trim().length >= 0) {
      this.passwordMessage = '';
      this.wrongPasswordClass = '';
    }
  }

  public validRepeatPassword(input: string): void {
    if (input.trim().length >= 0) {
      this.passwordRepeatMessage = '';
      this.wrongRepeatPasswordClass = '';
    }
  }


}
