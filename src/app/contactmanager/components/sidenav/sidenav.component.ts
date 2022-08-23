import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  public isScreenSmall: boolean;
  users: Observable<User[]>;
  isDarkTheme: boolean = false;
  direction = 'ltr';
  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router
  ) {}

  @ViewChild(MatSidenav) sideNav: MatSidenav;
  //LEARNING: This is a property that is used to control the behaviour of the side nav element in the tempalate/html
  // that has the same name , ie., #sideNav

  ngOnInit(): void {
    this.breakpointObserver
      //.observe([Breakpoints.XSmall]) //predefined breakpoint size
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`]) //using our own self-defined screen width to hit breakpoint
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
        //LEARNING: This observer detects whenever the browser loads or is resized to check the size of the window.
        //If the browser is smaller than 720 px, the page will load with the Contacts toolbar hidden,
        // if the page is resized to be larger this variable is updated and the [opened] variable in the html
        // for the toolbar is notified of this change in the isScreenSmall variable and automatically expands.
      });

    this.users = this.userService.users;
    this.userService.loadAll();
    //LEARNING: users starts observingthe userservice users for any data changes.
    // then we call loadAll on the service, which loads data into the userService.user variable
    // which in turn populates and observes on it, ie., this local users observable.

    // this.users.subscribe((data) => {
    //   if (data.length > 0)
    //     this.router.navigate(['/contactmanager', data[0].id]);
    //   // This takes care of the issue when we firstload the contact manager page without an id variable passed in
    //   // this will find the first user in the users dataset that we are subscribed to and pass that in as the id and
    //   // load the contact manager page.
    // });
    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sideNav.close();
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDirection() {
    this.direction = this.direction == 'ltr' ? 'rtl' : 'ltr';
  }
}
