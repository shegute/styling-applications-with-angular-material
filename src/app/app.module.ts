import { ContactmanagerModule } from './contactmanager/contactmanager.module';
import { ButtonsComponent } from './demo/buttons/buttons.component';
import { DemoModule } from './demo/demo.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  //The below is a lazy-loading technique for modules. looks like it will only load DemoModule when the demo path is called.
  //VS adding DemoModule to the imports section, which would load it on application starting, and adding paths like so here, {path:'demo', component: ButtonsComponent},
  {path:'demo', loadChildren:() => import('./demo/demo.module').then(m=>m.DemoModule)},
  {path:'contactmanager', loadChildren:() => import('./contactmanager/contactmanager.module').then(m=>m.ContactmanagerModule)},
  {path:'**', redirectTo:'demo'}
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
    //DemoModule //Not lazy loading, adding here for example comment above.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
