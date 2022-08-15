import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  template: `
    <button mat-button>
      <mat-icon>face</mat-icon>
      Click me!
    </button>

    <mat-checkbox>Check me!</mat-checkbox>

    <mat-chip-list aria-label="Fish selection">
      <mat-chip>One fish</mat-chip>
      <mat-chip>Two fish</mat-chip>
      <mat-chip color="primary" selected>Primary fish</mat-chip>
      <mat-chip color="accent" selected>Accent fish</mat-chip>
    </mat-chip-list>

  `,
  styles: [
  ]
})
export class ButtonsComponent implements OnInit {

  //These controls are defined in the https://material.angular.io/components site. You can look through the 35 or so components defined there.

  constructor() { }

  ngOnInit(): void {
  }

}
