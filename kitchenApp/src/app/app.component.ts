import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/services/auth.service';
import { LoggingService } from './shared/services/logging.service';

// * git-secret to safe api keys
// * 1) brew install git-secret
// * 2) gpg --full-generate-key
// * 3) git-secret init  and add key from  user/.gnupg/openpgp-revocs.d  to  ./.gitsecret/keys
// * 4) git-secret tell -m
// * 5) add hideMe.js file to .gitignore
// * 6) git secret add ./path/to/hideMe.js
// * 7) git secret hide
// * 8) git rm --cached hide.me
// * 9) git secret reveal to restore file
// * 10) second pc: gpg --armor --export mail@gmail.com > homeKey.asc
// * 11) import this key into first pc gpg setup: gpg --import ./homeKey.asc
// * 12) add second pc to repo: git secret tell nail@gmail.com
// * 13) re-encrypt the files: git secret reveal; git secret hide -d

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService,
  ){}

  ngOnInit() {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
