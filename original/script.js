const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', !open); mobileNav.classList.toggle('open'); });
document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => { mobileNav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.billing button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.billing button').forEach(b => b.classList.remove('active')); button.classList.add('active'); const interval = button.dataset.price; document.querySelectorAll('.price strong').forEach(price => price.textContent = price.dataset[interval === 'annual' ? 'year' : 'month']); }));
