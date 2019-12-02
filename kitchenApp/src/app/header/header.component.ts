import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public showMenu = false;

  public toggleMenu():void {
    this.showMenu = !this.showMenu;
  }
}
