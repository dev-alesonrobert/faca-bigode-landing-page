import { afterNextRender, DestroyRef, Directive, ElementRef, inject, Renderer2 } from '@angular/core';

/** Anima cada elemento uma vez, com o mesmo threshold do JavaScript original. */
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.renderer.addClass(this.element.nativeElement, 'visible');
        return;
      }
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'visible');
            observer.unobserve(entry.target);
          }
        }
      }, { threshold: .12 });
      observer.observe(this.element.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
