import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vote-stars',
  templateUrl: './vote-stars.component.html',
  styleUrls: ['./vote-stars.component.css']
})
export class VoteStarsComponent {
@Input() currentRate: number = 0;
  constructor() { }

}
