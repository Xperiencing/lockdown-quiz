import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { User } from 'src/app/models/user';
import { GuessTheWordService } from 'src/app/services/guess-the-word/guess-the-word.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import words from '../../../assets/common_words.json';

@Component({
	selector: 'app-guess-the-word',
	templateUrl: './guess-the-word.component.html',
	styleUrls: ['./guess-the-word.component.scss']
})
export class GuessTheWordComponent implements OnInit {

	@Input() userList: User[];

	public userWord: string = "";
    private _winSub: Subscription;
    private _restartSub: Subscription;

	public time: number = 0;
	private isRunning: boolean = true;

    private commonWords: any;
	private targetWord: string = "";
	public numGuesses: number = 0;

	public wordsAlphabeticalBelow: string[] = [];
	public wordsAlphabeticalAbove: string[] = [];

	public showWordError: boolean = false;
    public showEndScreen: boolean = false;

    public winningGuesses: number;
    public winningTime: number;
    public winningUser: string;

	constructor(private guessTheWordService: GuessTheWordService,
        public socketService: SocketService) { }

	ngOnInit(): void {
		this.guessTheWordService.loadEnglishDict();
        this.commonWords = words.commonWords;

        this.targetWord = this.commonWords[Math.floor(Math.random() * Math.floor(this.commonWords.length))];

        this._winSub = this.guessTheWordService.win.subscribe((data: any) => {
            this.winningGuesses = data.guesses;
            this.winningTime = data.time;
            this.winningUser = data.username;

            this.showEndScreen = true;
        });

        this._restartSub = this.guessTheWordService.restart.subscribe(x => {
            this.time = 0;
            this.numGuesses = 0;
            this.targetWord = this.commonWords[Math.floor(Math.random() * Math.floor(this.commonWords.length))];
            this.userWord = "";
            
            this.showEndScreen = false;
            this.isRunning = true;
        });

		timer(0, 1000).subscribe(x => {
			if (this.isRunning) {
				this.time += 1;
			}
		});
	}

	onSubmit() {
		let submittedWord = this.userWord.toLowerCase();

		if (this.guessTheWordService.checkword(submittedWord)) {
			this.showWordError = false;
			this.numGuesses += 1;

			if (this.userWord == this.targetWord) {
				this.endGame();
			}
			else if (this.userWord < this.targetWord) {
				this.wordsAlphabeticalBelow.push(submittedWord);
				this.wordsAlphabeticalBelow.sort(function (a, b) {
					if (a < b) { return -1; }
					if (a > b) { return 1; }
					return 0;
				});

				this.userWord = "";
			}
			else {
				this.wordsAlphabeticalAbove.push(submittedWord);
				this.wordsAlphabeticalAbove.sort(function (a, b) {
					if (a < b) { return -1; }
					if (a > b) { return 1; }
					return 0;
				});

				this.userWord = "";
			}
		} else {
			this.showWordError = true;
		}
	}

	endGame() {
        this.isRunning = false;
        this.guessTheWordService.emitWin(this.socketService.user.username, this.numGuesses, this.time, this.socketService.roomId);
	}

    restartGame() {
        this.guessTheWordService.restartGuessTheWord(this.socketService.roomId);
    }
}
