import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShareDataService} from "../../services/share-data.service";
import {ConfirmService} from "../../services/confirm.service";
import {Confirm} from "../../models/Confirm";

@Component({
  selector: 'app-tour-confirm',
  templateUrl: './tour-confirm.component.html',
  styleUrls: ['./tour-confirm.component.css']
})
export class TourConfirmComponent implements OnInit{


  code: string = '';
  alreadyCreated = false;
  pos1: string = '';
  pos2: string = '';
  pos3: string = '';
  pos4: string = '';
  pos5: string = '';
  pos6: string = '';
  pos7: string = '';
  pos8: string = '';

  constructor(public activeModal: NgbActiveModal, public shareData: ShareDataService, public confirmData: ConfirmService) { }

  async ngOnInit() {
    const tour = this.shareData.confirmTour
    if ( tour && tour.dID) {
      const confirm = await this.confirmData.findConfirmationByTourId(tour.dID)
      if (confirm && confirm.length != 0) {
        this.alreadyCreated = true;
        this.code = confirm[0].code;
      }
    }
  }

  async randomizedCode() {
    this.code = this.makeid(8)
    console.log(this.code)
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  async confirmCode() {

  }

 async createCode() {
    const tour = this.shareData.confirmTour;
    if(tour && tour.dID) {
      await this.randomizedCode();
      await this.confirmData.addConfirm(new Confirm(tour.dID, this.code))
      this.alreadyCreated = true;
    }
  }

}
