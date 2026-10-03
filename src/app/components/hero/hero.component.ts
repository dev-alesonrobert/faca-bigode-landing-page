import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-hero', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './hero.component.html', styleUrl: './hero.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class HeroComponent {}

