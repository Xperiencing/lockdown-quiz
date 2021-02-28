import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss']
})
export class EnterNameComponent implements OnInit {

  @Output() usernameSelect: EventEmitter<string> = new EventEmitter();

  public username: string = "";

  usernameForm = new FormGroup({
    username: new FormControl(this.username, [
      Validators.required,
    ])
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.usernameSelect.emit(this.usernameForm.value.username)
  }

}
