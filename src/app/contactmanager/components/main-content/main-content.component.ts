import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      //LEARNING: Get a value named id from the link that was clicked,
      // ie., [routerLink]="['/contactmanager', user.id]" from sidenav bar
      if(!id) id = 1; //If there is no id in the param, display the first item in the user datastore.
      //Hardcoded id,..uhh, personally maybe not a good idea but wth

      this.user = null;// Just resetting user to null so that we reload the user after a delay in teh setTimeout code below.
      this.userService.users.subscribe((users) => {
        if (users.length == 0) return;
        setTimeout(() => {
          this.user = this.userService.userById(id);
        }, 500);
      });
      //This is just adding a delay so that we can show the spinner for about half a second.
    });
  }
}
