import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgreeSliderModel } from 'src/app/models/agree-slider-model';
import { AgreeSliderService } from 'src/app/services/agree-slider/agree-slider.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-agree-slider',
  templateUrl: './agree-slider.component.html',
  styleUrls: ['./agree-slider.component.scss']
})
export class AgreeSliderComponent implements OnInit, OnDestroy {

  public slider: AgreeSliderModel;
  private _sliderSub: Subscription;

  constructor(private route: ActivatedRoute,
    private agreeSliderService: AgreeSliderService) { }

  ngOnInit(): void {

    const roomId = this.route.snapshot.paramMap.get('id');

    this.slider = new AgreeSliderModel(roomId, 3);

    this._sliderSub = this.agreeSliderService.currentSlider.subscribe(slider => this.slider = slider);
  }

  ngOnDestroy() {
    this._sliderSub.unsubscribe();
  }

  handleChangeEvent() {
    this.agreeSliderService.changeSlider(this.slider);
  }
}
