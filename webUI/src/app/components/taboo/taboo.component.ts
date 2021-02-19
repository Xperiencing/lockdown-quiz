import { Component, Input, OnInit } from '@angular/core';
import { TabooModel } from 'src/app/models/taboo';
import Taboo from '../../assets/taboo.json';

@Component({
  selector: 'app-taboo',
  templateUrl: './taboo.component.html',
  styleUrls: ['./taboo.component.scss']
})
export class TabooComponent implements OnInit {

  @Input() userList: string[];

  public tabbo_wordset: TabooModel[];

  constructor() { }

  ngOnInit(): void {
    this.tabbo_wordset = Taboo;
  }

}
