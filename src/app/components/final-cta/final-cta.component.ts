import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-final-cta', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './final-cta.component.html', styleUrl: './final-cta.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class FinalCtaComponent {}

