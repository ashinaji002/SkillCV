
const counters = document.querySelectorAll(".metric-value");
const buildCvBtn = document.querySelector("#buildCvBtn");

if (buildCvBtn) {
	buildCvBtn.addEventListener("click", () => {
		window.location.href = "templates.html";
	});
}

const runCounter = (el) => {
	const target = Number(el.dataset.target || 0);
	let current = 0;
	const step = Math.max(1, Math.floor(target / 24));

	const tick = () => {
		current = Math.min(target, current + step);
		el.textContent = `${current}%`;
		if (current < target) {
			window.requestAnimationFrame(tick);
		}
	};

	tick();
};

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				runCounter(entry.target);
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.6 }
);

counters.forEach((counter) => observer.observe(counter));
