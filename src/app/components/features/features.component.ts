import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-features', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './features.component.html', styleUrl: './features.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class FeaturesComponent {}

