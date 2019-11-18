import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss'],
  encapsulation: ViewEncapsulation.Emulated // None, Native, Emulated - default
})
export class ServerElementComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;
  // * Search element inside ng-content
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() {
    console.log('#ServerComponent constructor called!');
  }

  ngOnChanges(changes: SimpleChanges) {
    //  ! WHEN COMPONENT CREATED, WHEN COMPONENT INPUT DATA WAS CHANGED
    console.log('#ServerComponent ngOnChanges called!');
    console.log(changes);
  }

  ngOnInit() {
    // ! CALLED ONCE AFTER CLASS CONSTRUCTOR
    console.log('#ServerComponent ngOnInit called!');
    console.log('#ServerComponent Text Content: ' + this.header.nativeElement.textContent);
    console.log('#ServerComponent Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngDoCheck() {
    // ! CALLED EVERY TIME WHEN CHANGE DETECTION RUNS
    console.log('#ServerComponent ngDoCheck called!');
  }

  ngAfterContentInit() {
    // ! CALLED AFTER CONTENT(ng-content) HAS BEEN INITIALIZED
    console.log('#ServerComponent ngAfterContesntInit called!');
    console.log('#ServerComponent Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    // ! CALLED EVERY TIME WHEN CONTENT HAVE BEEN CHECKED
    console.log('#ServerComponent ngAfterContentChecked called!');
  }

  ngAfterViewInit() {
    // ! CALLED AFTER COMPONENT VIEW HAS BEEN INITIALIZED
    console.log('#ServerComponent ngAfterViewInit called!');
    console.log('#ServerComponent Text Content: ' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    // ! CALLED EVERY TIME WHEN VIEW HAVE BEEN CHECKED
    console.log('#ServerComponent ngAfterViewChecked called!');
  }

  ngOnDestroy() {
    // ! CALLED BEFORE DESTROY COMPONENT OBJECT
    console.log('#ServerComponent ngOnDestroy called!');
  }

}
