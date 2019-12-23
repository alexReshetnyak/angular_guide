import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/services/data-storage.service';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/models/user.model';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public showMenu = false;
  public isAuthenticated = false;

  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = !!user;
    });
  }

  public toggleMenu():void {
    this.showMenu = !this.showMenu;
  }

  public onSaveData (): void {
    this.dataStorageService.storeRecipes();
    this.showMenu = false;
  }

  public onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
    this.showMenu = false;
  }

  public onLogout(): void {
    this.authService.logout();
    this.showMenu = false;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
