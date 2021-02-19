import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePlayComponent } from './components/game-play/game-play.component';
import { GameSelectComponent } from './components/game-select/game-select.component';


const routes: Routes = [
  { path: '', component: GameSelectComponent },
  { path: ':game/:id', component: GamePlayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
