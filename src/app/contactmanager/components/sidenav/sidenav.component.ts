import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean;
  constructor(private breakpointObserver:BreakpointObserver) {

   }

  ngOnInit(): void {
    this.breakpointObserver
    //.observe([Breakpoints.XSmall]) //predefined breakpoint size
    .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`]) //using our own self-defined screen width to hit breakpoint
    .subscribe((state:BreakpointState) => {
      this.isScreenSmall = state.matches;
    })
  }

}
