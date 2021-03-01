import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit, OnDestroy {

  private gameId: string;

  get GetGameId() {
    return this.gameId;
  }
  
  public usernameSelectStage: boolean = false;
  public lobbyListStage: boolean = false;
  public playTaboo: boolean = false;
  public playFakinIt: boolean = false;
  public playGuessTheWord: boolean = false;

  public userList: User[];
  private _userListSub: Subscription;
  private _lobbySub: Subscription;

  constructor(private cookieService: CookieService,
    private route: ActivatedRoute,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.user = new User(this.socketService.newUserId(), "");

    this._userListSub = this.socketService.userList.subscribe(users => { 
      this.userList = users;
      this.socketService.user = this.userList.find(x => x.id == this.socketService.user.id);
    });

    this._lobbySub = this.socketService.shouldStartGame.subscribe(x => {
      this.startGame();
    })

    this.socketService.roomId = this.route.snapshot.paramMap.get('id');
    this.gameId = this.route.snapshot.paramMap.get('game');

    if(this.cookieService.check('lockdown-quiz-username')) {
      this.socketService.user.username = this.cookieService.get('lockdown-quiz-username');

      this.socketService.joinRoom(this.socketService.user);

      this.lobbyListStage = true;
    }
    else {
      this.usernameSelectStage = true;
    }
  }

  ngOnDestroy() {
    this._userListSub.unsubscribe();
    this._lobbySub.unsubscribe();
  }

  public onUserNameEntered(username: string) {
    this.cookieService.set('lockdown-quiz-username', username);
    this.socketService.user.username = username;

    this.socketService.joinRoom(this.socketService.user);

    this.usernameSelectStage = false;
    this.lobbyListStage = true;
  }

  public onShouldStartGame() {
    this.socketService.startGame();
  }

  private startGame() {
    this.lobbyListStage = false;

    switch(this.gameId) {
      case "taboo":
        this.playTaboo = true;
        break;
      case "fakin_it":
        this.playFakinIt = true;
        break;
      case "guess-the-word":
        this.playGuessTheWord = true;
        break;
    }
  }
}
