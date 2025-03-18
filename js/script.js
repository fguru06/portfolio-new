// Frontend Developer Portfolio JavaScript

document.addEventListener("DOMContentLoaded", function () {
	// Initialize Swiper sliders
	const initSwiper = (selector, options) => {
		document.querySelectorAll(selector).forEach((swiperContainer) => {
			new Swiper(swiperContainer, options);
		});
	};

	initSwiper(".project-swiper", {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: { delay: 3000, disableOnInteraction: false },
		pagination: { el: ".swiper-pagination", clickable: true },
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	initSwiper(".testimonial-swiper", {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: { delay: 5000, disableOnInteraction: false },
		pagination: { el: ".swiper-pagination", clickable: true },
		breakpoints: {
			768: { slidesPerView: 2, spaceBetween: 20 },
			992: { slidesPerView: 3, spaceBetween: 30 },
		},
	});

	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const targetElement =
				this.getAttribute("href") === "#home"
					? document.body
					: document.querySelector(this.getAttribute("href"));
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 80,
					behavior: "smooth",
				});
				document
					.querySelectorAll(".nav-link")
					.forEach((navLink) => navLink.classList.remove("active"));
				this.classList.add("active");
			}
		});
	});

	// Skills data and generation
	const skills = [
		{ name: "HTML5", width: "95%" },
		{ name: "CSS3/SASS", width: "90%" },
		{ name: "JavaScript", width: "85%" },
		{ name: "Vue.js", width: "75%" },
		{ name: "React.js", width: "50%" },
		{ name: "Bootstrap", width: "90%" },
		{ name: "Responsive Design", width: "95%" },
		{ name: "TypeScript", width: "70%" },
		{ name: "Node.js", width: "65%" },
		{ name: "Git", width: "80%" },
	];

	const skillsContainer = document.getElementById("skills-container");
	const showMoreSkillsButton = document.createElement("button");
	showMoreSkillsButton.className = "btn show-more-btn";
	showMoreSkillsButton.textContent = "Show More";

	const showLessSkillsButton = document.createElement("button");
	showLessSkillsButton.className = "btn show-more-btn";
	showLessSkillsButton.textContent = "Show Less";
	showLessSkillsButton.style.display = "none";

	const renderSkills = (skillsToShow) => {
		skillsContainer.innerHTML = "";
		skillsToShow.forEach((skill) => {
			const skillItem = document.createElement("div");
			skillItem.className = "skill-item";
			skillItem.innerHTML = `
				<span class="skill-name">${skill.name}</span>
				<div class="progress">
					<div class="progress-bar" role="progressbar" style="width: 0%;" data-width="${skill.width}"></div>
				</div>
			`;
			skillsContainer.appendChild(skillItem);
		});

		// Animate skill bars
		document.querySelectorAll(".progress-bar").forEach((bar) => {
			bar.style.width = bar.getAttribute("data-width");
			bar.classList.add("animated");
		});
	};

	const initialSkills = skills.slice(0, 5);
	renderSkills(initialSkills);

	skillsContainer.parentElement.appendChild(showMoreSkillsButton);
	skillsContainer.parentElement.appendChild(showLessSkillsButton);

	showMoreSkillsButton.addEventListener("click", () => {
		renderSkills(skills);
		showMoreSkillsButton.style.display = "none";
		showLessSkillsButton.style.display = "block";
	});

	showLessSkillsButton.addEventListener("click", () => {
		renderSkills(initialSkills);
		showLessSkillsButton.style.display = "none";
		showMoreSkillsButton.style.display = "block";
	});

	// Animate skill bars on load
	document.querySelectorAll(".progress-bar").forEach((bar) => {
		bar.style.width = bar.getAttribute("data-width");
		bar.classList.add("animated");
	});

	// Update active navigation link based on scroll position
	const sections = document.querySelectorAll("section[id]");
	const updateActiveNavOnScroll = () => {
		const scrollPosition = window.scrollY + 100;
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;
			const sectionId = section.getAttribute("id");
			if (
				scrollPosition >= sectionTop &&
				scrollPosition < sectionTop + sectionHeight
			) {
				document.querySelectorAll(".nav-link").forEach((navLink) => {
					navLink.classList.remove("active");
					if (navLink.getAttribute("href") === "#" + sectionId) {
						navLink.classList.add("active");
					}
				});
			}
		});
	};

	window.addEventListener("scroll", updateActiveNavOnScroll);

	// Form submission handling
	const contactForm = document.querySelector(".contact-form");
	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();
			const formData = new FormData(this);
			const formValues = Object.fromEntries(formData.entries());
			console.log("Form submitted with values:", formValues);

			const formElements = this.elements;
			for (let i = 0; i < formElements.length; i++) {
				formElements[i].disabled = true;
			}

			const successMessage = document.createElement("div");
			successMessage.className = "alert alert-success mt-3";
			successMessage.textContent =
				"Thank you for your message! I will get back to you soon.";
			this.appendChild(successMessage);

			setTimeout(() => {
				this.reset();
				for (let i = 0; i < formElements.length; i++) {
					formElements[i].disabled = false;
				}
				successMessage.remove();
			}, 3000);
		});
	}

	// Add animation classes to elements when they come into view
	const animateOnScroll = () => {
		document.querySelectorAll(".animate-on-scroll").forEach((element) => {
			if (element.getBoundingClientRect().top < window.innerHeight / 1.2) {
				element.classList.add("animated");
			}
		});
	};

	document
		.querySelectorAll(".project-card, .testimonial-card")
		.forEach((element) => {
			element.classList.add("animate-on-scroll");
		});

	animateOnScroll();
	window.addEventListener("scroll", animateOnScroll);

	// Toggle mobile menu
	const navbarToggler = document.querySelector(".navbar-toggler");
	if (navbarToggler) {
		navbarToggler.addEventListener("click", () => {
			document.querySelector(".navbar-collapse").classList.toggle("show");
		});
	}

	document.addEventListener("click", (e) => {
		const navbar = document.querySelector(".navbar");
		const navbarCollapse = document.querySelector(".navbar-collapse");
		if (
			navbarCollapse &&
			navbarCollapse.classList.contains("show") &&
			!navbar.contains(e.target)
		) {
			navbarCollapse.classList.remove("show");
		}
	});

	// Placeholder images for the portfolio
	const createPlaceholderImages = () => {
		console.log(
			"Placeholder images would be created here in a real development environment"
		);
	};

	createPlaceholderImages();

	// Projects data and generation
	const projects = [
		{
			title: "Peer Evaluation Group Activity",
			description:
				"Created a system for students to evaluate other group members, where instructors can create unlimited groups with unlimited members. The system saves data to a database, eliminating manual work for instructors.",
			images: [
				"images/Peernew1.jpg",
				"images/Peernew2.jpg",
				"images/Peernew3.jpg",
			],
			tech: ["HTML5", "CSS3", "JavaScript", "Database", "LMS Integration"],
		},
		{
			title: "Worked on complex survey activity",
			description:
				"Created Survey Activity where student's make multiple choice selection selected data saved in database they can come at the end of week to see results results were shown in bar graph and pie chart with the help of highchart plugin",
			images: [
				"images/Imagesup1.jpg",
				"images/Imagesup2.jpg",
				"images/Imagesup3.jpg",
			],
			tech: ["HTML5", "CSS3", "JavaScript", "LMS", "Responsive Design"],
		},
		{
			title: "Scenario based activity",
			description:
				"where student's can click each scenario go through each scenario based multiple choice quiz print summary at the end",
			images: [
				"images/Imagexl1.jpg",
				"images/Imagexl2.jpg",
				"images/Imagexl3.jpg",
			],
			tech: ["HTML5", "CSS3", "JavaScript", "LMS", "Responsive Design"],
		},
		{
			title: "Custom LMS Themes",
			description:
				"Built themes using JavaScript and CSS that aligned with partner branding requirements, enhancing front-end development and LMS customization for various educational institutions.",
			images: [
				"images/project2-1-placeholder.jpg",
				"images/project2-2-placeholder.jpg",
				"images/project2-3-placeholder.jpg",
			],
			tech: ["HTML5", "CSS3", "JavaScript", "LMS", "Responsive Design"],
		},
		{
			title: "Worked on maps",
			description:
				"Click and Reveal mapped info where student clicks on each state and some information will show under the map Used highcharts plugin Accessible and Responsive maps",
			images: [
				"images/Imagemap1.jpg",
				"images/Imagemap2.jpg",
				"images/Imagemap3.jpg",
			],
			tech: [
				"HTML5",
				"CSS3",
				"JavaScript",
				"Accessibility",
				"Responsive Design",
			],
		},
		{
			title: "Multiple Choice activity",
			description:
				"Multiple Choice activity where student's can select multiple choice quiz multiple selection quiz print out their submissions in pdf",
			images: [
				"images/Imager1.jpg",
				"images/Imager2.jpg",
				"images/Imager3.jpg",
			],
			tech: [
				"HTML5",
				"CSS3",
				"JavaScript",
				"Accessibility",
				"Responsive Design",
			],
		},
		{
			title: "Worked on Presentation",
			description:
				"Presentation where student's can select senario buttons each senario has information in tabs format",
			images: [
				"images/Imageru1.jpg",
				"images/Imageru2.jpg",
				"images/Imageru3.jpg",
			],
			tech: [
				"HTML5",
				"CSS3",
				"JavaScript",
				"Accessibility",
				"Responsive Design",
			],
		},
		{
			title: "Responsive Media Framework",
			description:
				"Participated in developing an in-house company-owned framework that accelerated the production of responsive media content. Led the R&D team for accessibility testing and development.",
			images: [
				"images/project3-1-placeholder.jpg",
				"images/project3-2-placeholder.jpg",
				"images/project3-3-placeholder.jpg",
			],
			tech: [
				"HTML5",
				"CSS3",
				"JavaScript",
				"Accessibility",
				"Responsive Design",
			],
		},
	];

	const projectsContainer = document.getElementById("projects-container");
	const showMoreButton = document.createElement("button");
	showMoreButton.className = "btn btn-primary";
	showMoreButton.textContent = "Show More";
	showMoreButton.style.display = "none";

	const showLessButton = document.createElement("button");
	showLessButton.className = "btn btn-secondary";
	showLessButton.textContent = "Show Less";
	showLessButton.style.display = "none";

	const renderProjects = (projectsToShow) => {
		projectsContainer.innerHTML = "";
		projectsToShow.forEach((project) => {
			const projectCard = document.createElement("div");
			projectCard.className = "project-card";
			projectCard.innerHTML = `
				<div class="row">
					<div class="col-md-6">
						<div class="swiper project-swiper">
							<div class="swiper-wrapper">
								${project.images
									.map(
										(image) => `
									<div class="swiper-slide">
										<img src="${image}" alt="${project.title}" class="project-img" />
									</div>
								`
									)
									.join("")}
							</div>
							<div class="swiper-pagination"></div>
							<div class="swiper-button-next"></div>
							<div class="swiper-button-prev"></div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="project-info">
							<h3 class="project-title">${project.title}</h3>
							<p class="project-description">${project.description}</p>
							<div class="project-tech">
								${project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
							</div>
							<div class="project-links">
								<a href="#" class="btn btn-sm btn-outline-primary">View Demo</a>
								<a href="#" class="btn btn-sm btn-outline-secondary">Details</a>
							</div>
						</div>
					</div>
				</div>
			`;
			projectsContainer.appendChild(projectCard);
		});

		// Initialize Swiper sliders for the newly added project cards
		initSwiper(".project-swiper", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			autoplay: { delay: 3000, disableOnInteraction: false },
			pagination: { el: ".swiper-pagination", clickable: true },
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	};

	const initialProjects = projects.slice(0, 3);
	renderProjects(initialProjects);

	if (projects.length > 3) {
		showMoreButton.style.display = "block";
		projectsContainer.appendChild(showMoreButton);
	}

	showMoreButton.addEventListener("click", () => {
		renderProjects(projects);
		showMoreButton.style.display = "none";
		showLessButton.style.display = "block";
		projectsContainer.appendChild(showLessButton);
	});

	showLessButton.addEventListener("click", () => {
		renderProjects(initialProjects);
		showLessButton.style.display = "none";
		showMoreButton.style.display = "block";
		projectsContainer.appendChild(showMoreButton);
	});

	// Certifications data and generation
	const certifications = [
		{
			title: "Building RESTful APIs with Node.js and Express",
			issuer: "LinkedIn Learning",
			date: "December 2024",
		},
		{
			title: "Microsoft Azure Fundamentals (AZ-900) Cert Prep",
			issuer: "Microsoft Press",
			date: "December 2024",
		},
		{
			title: "Node.js Essential Training",
			issuer: "LinkedIn Learning",
			date: "November 2024",
		},
		{
			title: "TypeScript Essential Training",
			issuer: "LinkedIn Learning",
			date: "May 2024",
		},
		{
			title: "Advanced Selenium: Automation Frameworks",
			issuer: "LinkedIn Learning",
			date: "December 2023",
		},
		{
			title: "ChatGPT for Web Developers",
			issuer: "LinkedIn Learning",
			date: "December 2023",
		},
		{
			title: "Learning Vue.js",
			issuer: "LinkedIn Learning",
			date: "March 2022",
		},
		{
			title: "Unconscious Bias",
			issuer: "LinkedIn Learning",
			date: "February 2022",
		},
		{
			title: "Confronting Bias: Thriving Across Our Differences",
			issuer: "LinkedIn Learning",
			date: "February 2022",
		},
		{
			title: "React.js Essential Training",
			issuer: "LinkedIn Learning",
			date: "December 2020",
		},
	];

	const certificationsContainer = document.querySelector(
		".certifications-container .row"
	);
	certifications.forEach((cert, index) => {
		const colDiv = document.createElement("div");
		colDiv.className = "col-md-6";
		colDiv.innerHTML = `
			<div class="certification-item">
				<h4 class="cert-name">${cert.title}</h4>
				<p class="cert-issuer">${cert.issuer}</p>
				<p class="cert-date">${cert.date}</p>
			</div>
		`;
		certificationsContainer.appendChild(colDiv);
	});
});

// Disable right-click
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable text selection
document.addEventListener("selectstart", (e) => e.preventDefault());

// Disable specific keyboard shortcuts (e.g., Ctrl+U, Ctrl+Shift+I)
document.addEventListener("keydown", (e) => {
	if (
		e.ctrlKey &&
		(e.key === "u" || e.key === "U" || e.key === "i" || e.key === "I")
	) {
		e.preventDefault();
	}
});
