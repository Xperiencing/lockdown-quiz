import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-end-game-summary',
  templateUrl: './end-game-summary.component.html',
  styleUrls: ['./end-game-summary.component.scss']
})
export class EndGameSummaryComponent implements OnInit {

  @Input() userList: User[];
  
  public userScoreList: User[];

  constructor() { }

  ngOnInit(): void {
    this.userScoreList = this.userList.sort((a, b) => a.score - b.score);
  }

}
