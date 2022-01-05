import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TourService} from "../../../services/tour.service";
import {ShareDataService} from "../../../services/share-data.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.css']
})
export class ConfirmDeletionComponent {

  constructor(public tourData: TourService, public shareData: ShareDataService, public activeModal: NgbActiveModal, public alert: AlertService, private router: Router) { }

  async deleteTour() {
    if (this.shareData.detailTour)
      await this.tourData.deleteTour(this.shareData.detailTour);
    this.activeModal.dismiss()
    this.router.navigate(["/profil"])
    this.alert.showAlert({type: 'danger', message: 'Tour gelöscht!'});
  }
}
