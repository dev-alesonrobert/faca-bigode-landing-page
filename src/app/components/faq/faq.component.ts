import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-faq', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './faq.component.html', styleUrl: './faq.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class FaqComponent {}

