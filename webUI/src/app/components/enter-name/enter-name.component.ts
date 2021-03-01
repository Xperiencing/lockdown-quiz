import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss']
})
export class EnterNameComponent implements OnInit {
  @Input() gameName: string;

  @Output() usernameSelect: EventEmitter<string> = new EventEmitter();

  usernameForm = this.formBuilder.group({
    username: '',
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.usernameSelect.emit(this.usernameForm.value.username)
  }

  public getSelectedGame() {
    switch (this.gameName) {
      case 'taboo':
        return 'enter-name-taboo';
        case 'switch':
          return 'enter-name-switch';
      default:
        return 'enter-name-default';
    }
  }
}
