import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-how-it-works', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './how-it-works.component.html', styleUrl: './how-it-works.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class HowItWorksComponent {}

