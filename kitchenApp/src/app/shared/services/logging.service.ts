import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';

@Injectable({ providedIn: SharedModule })
export class LoggingService {
  private lastLog: string;

  printLog(message: string) {
    console.log('Log message:', message);
    console.log('Log message:', this.lastLog);
    this.lastLog = message;
  }
}
