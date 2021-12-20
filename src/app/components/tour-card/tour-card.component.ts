import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";
import {UserService} from "../../services/user.service";
import {UserCargo} from "../../models/UserCargo";

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit{

  @Input()
  tour: Tour = new Tour(false, '','','',0,'',0,0,0,'',);
  mergeDateAndTime = ''
  userName = '';

  constructor(public userService: UserService) {
  }

  ngOnInit(){
    this.mergeDateAndTime = this.tour.date + 'T' + this.tour.startTime;
    this.changeUserName()
  }

  navigateToDetails() {
    console.log(this.tour)
  }

  changeUserName(){
    this.userService.getUser(this.tour.offer? this.tour.driver: this.tour.passengers[0]).then(
      (user) => {
        if (user) {
          this.userName = user.username
        }else{
          this.userName = "Kein User"
        }
      }
    )
  }

}
