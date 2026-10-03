import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { BillingInterval } from '../../models/billing-interval';

type Plan = 'essential' | 'professional' | 'premium';

@Component({
  selector: 'app-pricing',
  standalone: true,
  preserveWhitespaces: true,
  imports: [RevealDirective],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingComponent {
  billingInterval: BillingInterval = 'monthly';
  readonly monthlyPrices: Readonly<Record<Plan, number>> = {
    essential: 49.90,
    professional: 99.90,
    premium: 149.90
  };
  readonly annualDiscount = 0.20;
  private readonly formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  setBillingInterval(interval: BillingInterval): void {
    this.billingInterval = interval;
  }

  priceFor(plan: Plan): string {
    return this.formatter.format(this.monthlyEquivalent(plan));
  }

  billingNoteFor(plan: Plan): string {
    return this.billingInterval === 'annual'
      ? `Cobrado anualmente: R$ ${this.formatter.format(this.monthlyEquivalent(plan) * 12)} · Valor fictício`
      : 'Cobrado mensalmente · Valor fictício';
  }

  private monthlyEquivalent(plan: Plan): number {
    const monthly = this.monthlyPrices[plan];
    return this.billingInterval === 'annual'
      ? Math.round(monthly * (1 - this.annualDiscount) * 100) / 100
      : monthly;
  }
}
