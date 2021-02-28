import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class GuessTheWordService {

    public englishDictionary: any;
    public win = this.socket.fromEvent<any>('winGTWEvent');
    public restart = this.socket.fromEvent<boolean>('restartGTWEvent');

    constructor(private http: HttpClient,
        private socket: Socket) { }



    loadEnglishDict() {
        return this.http.get('../../../assets/en.txt', { responseType: 'text' }).subscribe(data => this.englishDictionary = data);
    }

    checkword(word): boolean {
        var regex = new RegExp('\n' + word + '\n');

        if (this.englishDictionary.toString('utf-8').match(regex)) {
            return true;
        }
        return false;
    };

    emitWin(username: string, guesses: number, time: number, roomId: string) {
        this.socket.emit('winGTW', { username: username, guesses: guesses, time: time, roomId: roomId });
    }

    restartGuessTheWord(roomId: string) {
        this.socket.emit('restartGTW', roomId);
    }
}
