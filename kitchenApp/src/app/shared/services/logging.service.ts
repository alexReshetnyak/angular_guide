import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private lastLog: string;

  printLog(message: string) {
    console.log('Log message:', message);
    console.log('Log message:', this.lastLog);
    this.lastLog = message;
  }
}
