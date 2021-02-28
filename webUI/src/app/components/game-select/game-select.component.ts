import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.scss']
})
export class GameSelectComponent implements OnInit {

  constructor(private socketService: SocketService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  playAgreeDisagreeGame() {
    var id = this.socketService.newRoomId();
    this.router.navigate(['/taboo/' + id]);
  }

  playGuessTheWord() {
    var id = this.socketService.newRoomId();
    this.router.navigate(['/guess-the-word/' + id]);
  }
}
