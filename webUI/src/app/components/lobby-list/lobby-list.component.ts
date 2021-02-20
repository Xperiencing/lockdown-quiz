import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.scss']
})
export class LobbyListComponent implements OnInit {

  @Input() userList: User[];

  @Output() shouldStartGame: EventEmitter<boolean> = new EventEmitter();

  constructor(public socketService: SocketService) { }

  ngOnInit(): void {
  }

  startGame() {
    this.shouldStartGame.emit(true);
  }

}
