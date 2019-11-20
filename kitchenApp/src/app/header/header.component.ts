import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public showMenu = false;
  @Output() private featureSelected: EventEmitter<string> = new EventEmitter<string>();

  public onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  public toggleMenu():void {
    this.showMenu = !this.showMenu;
  }
}
