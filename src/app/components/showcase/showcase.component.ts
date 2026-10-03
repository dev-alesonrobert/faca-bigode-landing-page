import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-showcase', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './showcase.component.html', styleUrl: './showcase.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class ShowcaseComponent {}

