import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

interface Server {
  serverName: string;
  serverContent: string;
}

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit, AfterViewChecked {
  @Output()
  serverCreated: EventEmitter<Server> = new EventEmitter<Server>();
  // tslint:disable-next-line:no-output-rename
  @Output('bpCreated')
  blueprintCreated: EventEmitter<Server> = new EventEmitter<Server>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', { static: false }) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    console.log('#CockpitComponent serverContentInput', this.serverContentInput);
  }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

}
