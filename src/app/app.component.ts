import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ProofComponent } from './components/proof/proof.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { FeaturesComponent } from './components/features/features.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { AudienceComponent } from './components/audience/audience.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FinalCtaComponent } from './components/final-cta/final-cta.component';
import { FaqComponent } from './components/faq/faq.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
@Component({selector:'app-root', standalone:true, imports:[HeroComponent, ProofComponent, ProblemsComponent, FeaturesComponent, ShowcaseComponent, HowItWorksComponent, AudienceComponent, TestimonialsComponent, PricingComponent, FinalCtaComponent, FaqComponent, HeaderComponent, FooterComponent], templateUrl:'./app.component.html', styleUrl:'./app.component.scss'})
export class AppComponent {}
