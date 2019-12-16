import { Component } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public showMenu = false;

  constructor(
    private dataStorageService: DataStorageService
  ) {}

  public toggleMenu():void {
    this.showMenu = !this.showMenu;
  }

  public onSaveData (): void {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
