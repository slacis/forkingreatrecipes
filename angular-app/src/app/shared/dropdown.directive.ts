import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  // @HostListener('mousedown') mousedown(eventData: Event) {
  //   if (this.elRef.nativeElement.classList.contains('open')) {
  //     this.renderer.removeClass(this.elRef.nativeElement, 'open');
  //   } else {
  //     this.renderer.addClass(this.elRef.nativeElement, 'open');
  //   }
  // }
}
