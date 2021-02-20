import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class TabooService {

  message = this.socket.fromEvent<Message>('receiveMessageTaboo');

  constructor(private socket: Socket) { }

  public sendMessage(roomId: string, message: Message) {
    this.socket.emit('sendMessageTaboo', {roomId: roomId, message: message });
  }
}
