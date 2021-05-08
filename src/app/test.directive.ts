import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTest]',
})
export class TestDirective {
  @Input() enterColor: any;
  constructor(private el: ElementRef) {
    console.log(this.el.nativeElement);
  }
  ngOnInit() {
    console.log('Color de de', this.enterColor);
  }
  @HostListener('mouseenter') colorChange() {
    this.el.nativeElement.style.backgroundColor = this.enterColor;
  }
  @HostListener('mouseleave') colors() {
    this.el.nativeElement.style.backgroundColor = '#eee';
  }
}
