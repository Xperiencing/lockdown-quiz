import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';

import { GameSelectComponent } from './components/game-select/game-select.component';
import { AgreeSliderComponent } from './components/agree-slider/agree-slider.component';
import { GamePlayComponent } from './components/game-play/game-play.component';
import { EnterNameComponent } from './components/enter-name/enter-name.component';
import { LobbyListComponent } from './components/lobby-list/lobby-list.component';
import { TabooComponent } from './components/taboo/taboo.component';
import { EndGameSummaryComponent } from './components/end-game-summary/end-game-summary.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AgreeSliderComponent,
    GameSelectComponent,
    GamePlayComponent,
    EnterNameComponent,
    LobbyListComponent,
    TabooComponent,
    EndGameSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
