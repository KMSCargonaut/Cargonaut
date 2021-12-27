import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-stars',
  templateUrl: './vote-stars.component.html',
  styleUrls: ['./vote-stars.component.css']
})
export class VoteStarsComponent implements OnInit {
@Input() currentRate: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
