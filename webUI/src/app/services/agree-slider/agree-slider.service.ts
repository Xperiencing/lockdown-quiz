import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AgreeSliderModel } from 'src/app/models/agree-slider-model';

@Injectable({
  providedIn: 'root'
})
export class AgreeSliderService {

  currentSlider = this.socket.fromEvent<AgreeSliderModel>('slider');
  //currentSlider = this.socket.on('slider', (arg) => { console.log(arg)});

  constructor(private socket: Socket) { }

  changeSlider(slider: AgreeSliderModel) {
    this.socket.emit('sliderChange', slider);
  }

}
