import {Component, Input} from '@angular/core';
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {ShareDataService} from "../../services/share-data.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../../models/Status";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddEvaluationComponent} from "../add-evaluation/add-evaluation.component";
import {AlertService} from "../../services/alert.service";
import {TourConfirmComponent} from "../tour-confirm/tour-confirm.component";

@Component({
  selector: 'app-tour-table',
  templateUrl: './tour-table.component.html',
  styleUrls: ['./tour-table.component.css']
})
export class TourTableComponent {

  @Input() usedList: Tour[] = [];
  status: number = 0;

  constructor(public tourService: TourService, public userService: UserService,
              public router: Router, public modal: NgbModal, public alertData: AlertService,
              public shareData: ShareDataService, public route: ActivatedRoute) {

  }

  async navigateToDetails(tour: Tour) {
    const user = await this.userService.getUser(tour.creatorID);
    this.router.navigate([`/tour-details/${tour.dID}/${user?.uid}`])

  }

  async navigateToEdit(tour: Tour) {
    const user = await this.userService.getUser(tour.creatorID);
    const root = this.route.snapshot.url[0].path;
    this.router.navigate([`/editTour/${tour.dID}/${user?.uid}/${root}`])
  }

  switchStatus(tour: Tour): number {
    switch (tour.status) {
      case Status.NOSTARTEDYET:
        return 0;
      case Status.ONTHEWAY:
        return 1;
      case Status.ARRIVED:
        return 2;
    }
  }

  isCreator(tour: Tour): boolean {
    return tour.creatorID === this.userService.currUser?.uid;
  }

  userIsPassenger(tour: Tour): boolean {
    return tour.passengers.some(passenger => passenger.id === this.userService.currUser?.uid);
  }

  openTourCode(tour: Tour) {
    if (this.userService.currUser) {
      this.shareData.isUserDriver = this.userService.currUser.uid === tour.driver;
      this.shareData.confirmTour = tour;
    }
    const modalRef = this.modal.open(TourConfirmComponent, {
      animation: true,
      centered: true
    });


    modalRef.dismissed.toPromise().then(async result => {
      console.log(result, tour);
    })
  }

  openEvaluation(tour: Tour) {
    const modalRef = this.modal.open(AddEvaluationComponent, {
      animation: true,
      centered: true
    });
    modalRef.dismissed.toPromise().then(async result => {
      console.log(result);
      if (result) {
        let stars = Number.parseInt(result);
        let passenger = tour.passengers.find(passenger => passenger.id === this.userService.currUser?.uid);

        if (passenger && passenger.evaluated === -1) {
          passenger.evaluated = stars;
          console.log(passenger)
          await this.tourService.updateTour(tour);
          let user = await this.userService.getUser(tour.creatorID);
          if (user) {
            if (user.evaluation === -1) {
              user.evaluation += 1;
            }
            user.evaluation += stars;
            user.evaluationCounter += 1;
            await this.userService.updateUser(user);
            console.log(user);
            this.alertData.showAlert({type: 'success', message: 'Erfolgreich bewertet!'})
          }
        } else if (passenger && passenger.evaluated >= 0) {
          let tempEva = passenger.evaluated;
          passenger.evaluated = stars;
          console.log(passenger)
          await this.tourService.updateTour(tour)
          let user = await this.userService.getUser(tour.creatorID);
          if (user) {
            user.evaluation -= tempEva;
            user.evaluation += stars
            await this.userService.updateUser(user);
            console.log(user);
            this.alertData.showAlert({type: 'success', message: 'Erfolgreich Bewertung geändert!'})
          }
        }
      }
    })
  }


}
