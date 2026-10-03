import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-problems', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './problems.component.html', styleUrl: './problems.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class ProblemsComponent {}

