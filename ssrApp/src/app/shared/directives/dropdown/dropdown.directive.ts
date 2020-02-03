import {
  Directive,
  HostListener,
  HostBinding,
  Input,
  ElementRef,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // @HostBinding('class.show') isOpen = false;
  @Input() cssClass = 'show';
  private isOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.addClass(this.elRef.nativeElement, this.cssClass);
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, this.cssClass);
    }
  }
}
