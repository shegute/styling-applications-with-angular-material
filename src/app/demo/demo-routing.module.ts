import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';


const routes: Routes = [
  //,   <<< Watchout, This extra comma here will mess things up.
  // Give you a very unhelpful error message, TypeError: Cannot read properties of undefined (reading 'outlet')
  { path: 'buttons', component: ButtonsComponent },
  { path: '**', redirectTo: 'buttons'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }

