import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../shared/material.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainContentComponent } from './components/main-content/main-content.component';

const routes: Routes = [
  //We dont need a path identifier to load the ContactManagerAppComponent, since we have defined in the app.module, /contactmanager will
  //load the ContactManagerModule and here '' states that the ContactMangerAppComponent is what will be loaded by default
  //if we define another subpath eg,   { path: 'toolbar', component: ContactmanagerAppComponent }, then /contactmanager/toolbar will load that component

  {
    path: '', component: ContactmanagerAppComponent,
    children: [
      { path: ':id', component: MainContentComponent },
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: 'demo' },
];

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    SidenavComponent,
    MainContentComponent,
  ],
  providers: [
    UserService,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class ContactmanagerModule {}
