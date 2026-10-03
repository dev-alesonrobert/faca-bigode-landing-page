import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({selector: 'app-proof', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './proof.component.html', styleUrl: './proof.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class ProofComponent {}

