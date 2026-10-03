import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-audience', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './audience.component.html', styleUrl: './audience.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class AudienceComponent {}

