import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TabooModel } from 'src/app/models/taboo';
import { Subscription, timer } from 'rxjs';
import Taboo from '../../../assets/Taboo.json';
import { Message } from 'src/app/models/message';
import { SocketService } from 'src/app/services/socket/socket.service';
import { TabooService } from 'src/app/services/taboo/taboo.service';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-taboo',
    templateUrl: './taboo.component.html',
    styleUrls: ['./taboo.component.scss']
})
export class TabooComponent implements OnInit, OnDestroy {

    @Input() userList: User[];

    private static ROUNDS = 1;
    private static NUM_WORDS = 5;
    public static TIME = 30;

    private tabooWordset: Array<TabooModel>;
    public currentWordsetForTurn: TabooModel[] = [];
    public currentWord: TabooModel;
    public currentWordIndex: number = 0;

    public messageLog: Message[] = [];
    public message: Message;

    public _messageSub: Subscription;
    public _readySub: Subscription;

    userTurn: number = 0;
    isUsersTurn: boolean = false;
    isRunning: boolean = false;
    time: number = TabooComponent.TIME;
    readyCheck = false;
    round: number = 1;
    endGame: boolean = false;

    constructor(private socketService: SocketService,
        private tabooService: TabooService) {
        this.tabooWordset = Taboo;
    }

    ngOnInit(): void {
        this.assignRoles();

        this.message = new Message(this.socketService.user, "");
        this._messageSub = this.tabooService.message.subscribe((message: Message) => {
            this.messageLog.push(message);

            if (message.isCorrect) {
                this.assignPoints(message.user);
                this.goToNextCard();
            }
        });

        this._readySub = this.socketService.readyEvent.subscribe(x => {
            this.readyCheck = true;
            this.toggleTimer();
        });

        timer(0, 1000).subscribe(x => {
            if(this.time <= 0) {
                this.toggleTimer();
                this.goNextRound();
                this.time = TabooComponent.TIME;
            }
            if (this.isRunning) {
                this.time--;
            }
        });
    }

    ngOnDestroy(): void {
        this._messageSub.unsubscribe();
        this._readySub.unsubscribe();
    }

    toggleTimer() {
        this.isRunning = !this.isRunning;
    }

    onSubmit() {
        this.message.text = this.message.text.toLowerCase();
        this.tabooService.sendMessage(this.socketService.roomId, this.message, this.currentWordIndex);

        this.message.isCorrect = false;
        this.message.text = "";
    }

    private assignRoles() {
        if(this.userList.length > this.userTurn) {
            if(this.userList[this.userTurn] == this.socketService.user) {
                this.isUsersTurn = true;
            } else {
                this.isUsersTurn = false;
            }
        } 
        else {
            this.round++;

            if(this.round <= TabooComponent.ROUNDS) {
                this.userTurn = 0;

                if(this.userList[this.userTurn] == this.socketService.user) {
                    this.isUsersTurn = true;
                } else {
                    this.isUsersTurn = false;
                }
            } else {
                this.endGame = true;
            }
        }
    }
    
    public onReady() {
        this.chooseCard();
        this.socketService.ready();
    }

    private chooseCard() {
        this.currentWordsetForTurn = [];

        for(let i = 0; i < TabooComponent.NUM_WORDS; i++) {
            let tempCard = Math.floor(Math.random() * Math.floor(this.tabooWordset.length));

            this.currentWordsetForTurn.push(this.tabooWordset[tempCard]);
            this.tabooWordset.splice(tempCard, 1);
        }

        let wordsList = this.currentWordsetForTurn.map(function(x) { return x.word; });
        this.tabooService.sendTabooWord(this.socketService.roomId, wordsList);
    }

    private goToNextCard() {
        if(this.currentWordIndex < TabooComponent.NUM_WORDS - 1) {
            this.currentWordIndex++;
        } else {
            this.readyCheck = false;
            this.goNextRound();
        }
    }

    private goNextRound() {
        this.userTurn++;
        this.currentWordIndex = 0;
        this.readyCheck = false;
        this.assignRoles();
    }

    private assignPoints(user: User) {
        this.userList[this.userTurn].score += 1;
        this.userList.find(x => x.id == user.id).score += 1;
    }
}
