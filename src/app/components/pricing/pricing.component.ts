import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { BillingInterval } from '../../models/billing-interval';

@Component({selector: 'app-pricing', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './pricing.component.html', styleUrl: './pricing.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class PricingComponent {
  billingInterval: BillingInterval = 'monthly';
  setBillingInterval(interval: BillingInterval): void { this.billingInterval = interval; }
}

