import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public roomId: string;
  public user: User;
  
  userList = this.socket.fromEvent<User[]>('userList');
  shouldStartGame = this.socket.fromEvent<boolean>('startGameEvent');
  readyEvent = this.socket.fromEvent<boolean>('readyEvent');

  constructor(private socket: Socket) { }

  joinRoom(user: User) {
    this.socket.emit('joinRoom', { user: user, roomId: this.roomId });
  }

  startGame() {
    this.socket.emit('startGame', this.roomId );
  }

  ready() {
    this.socket.emit('ready', this.roomId);
  }

  public newRoomId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  public newUserId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return text;
  }
}
