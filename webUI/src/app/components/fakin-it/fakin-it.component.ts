import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-fakin-it',
  templateUrl: './fakin-it.component.html',
  styleUrls: ['./fakin-it.component.scss']
})
export class FakinItComponent implements OnInit {

  @Input() userList: User[];

  constructor() { }

  ngOnInit(): void {
  }

}
