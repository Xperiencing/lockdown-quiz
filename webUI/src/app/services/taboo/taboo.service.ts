import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class TabooService {

  message = this.socket.fromEvent<Message>('receiveMessageTaboo');

  constructor(private socket: Socket) { }

  public sendMessage(roomId: string, message: Message, currentWordIndex: number) {
    this.socket.emit('sendMessageTaboo', {roomId: roomId, message: message, currentWordIndex: currentWordIndex });
  }

  public sendTabooWord(roomId: string, tabooWords: string[]) {
    this.socket.emit('sendTabooWords', { roomId: roomId, tabooWords: tabooWords });
  }
}
