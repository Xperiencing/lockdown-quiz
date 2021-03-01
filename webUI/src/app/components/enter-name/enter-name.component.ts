import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss']
})
export class EnterNameComponent implements OnInit {
  @Input() gameId: string;

  @Output() usernameSelect: EventEmitter<string> = new EventEmitter();


  public username: string = "";
  public gameName: string;

  usernameForm = new FormGroup({
    username: new FormControl(this.username, [
      Validators.required,
    ])
  });

  constructor() { }

  ngOnInit(): void {
    this.gameName = this.gameId.replace(/-/g, ' ');
  }

  onSubmit() {
    this.usernameSelect.emit(this.usernameForm.value.username)
  }

  public getSelectedGame() {
    switch (this.gameId) {
      case 'taboo':
        return 'enter-name-taboo';
      case 'switch':
        return 'enter-name-switch';
      case 'guess-the-word':
        return 'enter-name-guess-word';
      default:
        return 'enter-name-default';
    }
  }
}
