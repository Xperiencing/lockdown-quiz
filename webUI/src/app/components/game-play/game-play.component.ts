import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit, OnDestroy {

  private roomId: string;
  private gameId: string;

  public username: string;
  public usernameSelectStage: boolean = false;
  public lobbyListStage: boolean = false;
  public playTabbo: boolean = false;

  public userList: string[];
  private _userListSub: Subscription;

  constructor(private cookieService: CookieService,
    private route: ActivatedRoute,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this._userListSub = this.socketService.userList.subscribe(users => this.userList = users);

    this.roomId = this.route.snapshot.paramMap.get('id');
    this.gameId = this.route.snapshot.paramMap.get('game');

    if(this.cookieService.check('lockdown-quiz-username')) {
      this.username = this.cookieService.get('lockdown-quiz-username');

      this.socketService.joinRoom(this.username, this.roomId);

      this.lobbyListStage = true;
    }
    else {
      this.usernameSelectStage = true;
    }
  }

  ngOnDestroy() {
    this._userListSub.unsubscribe();
  }

  public onUserNameEntered(username: string) {
    this.cookieService.set('lockdown-quiz-username', username);
    this.username = username;

    this.socketService.joinRoom(this.username, this.roomId);

    this.usernameSelectStage = false;
    this.lobbyListStage = true;
  }

  public onShouldStartGame() {
    this.lobbyListStage = false;

    switch(this.gameId) {
      case "taboo":
        this.playTabbo = true;
    }
  }
}
