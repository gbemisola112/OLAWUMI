document.addEventListener('DOMContentLoaded', () => {
	const navbar = document.querySelector('.navbar');
	const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

	// Smooth scrolling with offset for fixed navbar
	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			if (!href || href === '#') return;
			const target = document.querySelector(href);
			if (!target) return;
			e.preventDefault();
			const offset = navbar ? navbar.offsetHeight : 0;
			const top = target.getBoundingClientRect().top + window.pageYOffset - offset + 2;
			window.scrollTo({ top, behavior: 'smooth' });

			// Close mobile navbar when a link is clicked
			const collapseEl = document.querySelector('.navbar-collapse');
			if (collapseEl && collapseEl.classList.contains('show')) {
				const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl);
				bsCollapse.hide();
			}
		});
	});

	// Highlight active nav link based on visible section
	const sections = document.querySelectorAll('main section[id]');
	if (sections.length) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				const id = entry.target.id;
				const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
				if (entry.isIntersecting) {
					document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
					if (navLink) navLink.classList.add('active');
				}
			});
		}, { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 });

		sections.forEach(s => observer.observe(s));
	}

	// Ensure carousel runs with a friendly interval
	const fashionCarousel = document.getElementById('fashionCarousel');
	if (fashionCarousel && window.bootstrap && bootstrap.Carousel) {
		// getOrCreateInstance keeps control if user already initialized via data-attrs
		bootstrap.Carousel.getOrCreateInstance(fashionCarousel, { interval: 4000, ride: 'carousel' });
	}

	// Optional: close mobile menu on outside click
	document.addEventListener('click', (e) => {
		const collapseEl = document.querySelector('.navbar-collapse');
		if (!collapseEl) return;
		if (!collapseEl.classList.contains('show')) return;
		const isClickInside = collapseEl.contains(e.target) || e.target.closest('.navbar-toggler');
		if (!isClickInside) {
			const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl);
			bsCollapse.hide();
		}
	});
});

// Contact form handling (mock)
document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('contactForm');
	if (!form) return;
	const alertBox = document.getElementById('formAlert');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const formData = new FormData(form);
		const name = formData.get('name')?.toString().trim();
		const email = formData.get('email')?.toString().trim();
		const message = formData.get('message')?.toString().trim();

		if (!name || !email || !message) {
			alertBox.className = 'alert alert-danger';
			alertBox.textContent = 'Please fill in all required fields.';
			alertBox.classList.remove('d-none');
			return;
		}

		// Simulate submission
		alertBox.className = 'alert alert-success';
		alertBox.textContent = 'Thanks! Your message has been received. We will get back to you shortly.';
		alertBox.classList.remove('d-none');

		form.reset();

		// Hide alert after a few seconds
		setTimeout(() => {
			alertBox.classList.add('d-none');
		}, 6000);
	});
});

