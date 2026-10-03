import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-testimonials', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './testimonials.component.html', styleUrl: './testimonials.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class TestimonialsComponent {}

