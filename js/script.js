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
    { name: "Accessibility", width: "95%" },
    { name: "Responsive Design", width: "95%" },
    { name: "AI Powered Development", width: "85%" },
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
      "Placeholder images would be created here in a real development environment",
    );
  };

  createPlaceholderImages();

  // Projects data and generation
  const projects = [
    {
      title: "Interactive Human Body with Hotspots & Quiz",
      description:
        "An interactive human body illustration with clickable hotspots to reveal information about different body parts. Includes a quiz feature to test knowledge. Built with modern web technologies for accessibility and engagement.",
      images: ["assets/interactives/humanbody/assets/Hbody.166ab625.jpg"],
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Vue.js",
        "Responsive Design",
        "Accessibility",
      ],
      demo: "assets/interactives/humanbody/index.html",
    },
    {
      title: "Likert Scale Health Survey Interactive",
      description:
        "A Likert scale-based health survey interactive built with modern web technologies. Users can rate statements on a scale, and results are visualized for instant feedback. This interactive supports multiple users, saves data in a database, and displays user averages in a graph for enhanced engagement and analytics. Designed for accessibility and responsive use in educational or healthcare settings.",
      images: ["images/Likertsurvey1.png", "images/Likertsurvey2.png"],
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Vue.js",
        "Responsive Design",
        "Accessibility",
      ],
      demo: "assets/interactives/likertscale-health/index.html",
    },
    {
      title: "Peer Evaluation (Self & Peer with Analytics)",
      description:
        "A robust peer evaluation tool that enables both self and peer assessments within groups. This interactive allows students to rate themselves and their peers on various criteria, with results visualized using Highcharts for clear, actionable insights. The system automatically calculates and displays group and individual averages, making it easy for instructors and students to identify strengths and areas for improvement. Designed for accessibility, responsive use, and seamless integration into eLearning environments.",
      images: [
        "images/peereval1.png",
        "images/peereval2.png",
        "images/peereval3.png",
      ],
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Highcharts",
        "Accessibility",
        "Responsive Design",
      ],
      demo: "assets/interactives/peereval/index.html",
    },
    {
      title: "Complex Survey Activity",
      description:
        "Designed a survey activity where students make multiple-choice selections, with data saved in a database. Students can revisit to view results displayed as bar graphs and pie charts using the Highcharts plugin.",
      images: [
        "images/Imagesup1.jpg",
        "images/Imagesup2.jpg",
        "images/Imagesup3.jpg",
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "LMS", "Responsive Design"],
      video:
        "assets/videos/Pediatric-Health-Promotions-and-Immunizations-Case-Scenarios.webm", // Corrected path
    },
    {
      title: "Interactive Flashcard Health Learning Tool",
      description:
        "An engaging health education flashcard system designed for interactive learning. This tool features a card-based interface where students can review health and medical concepts through an intuitive flip-card experience. The application provides a structured learning environment with modern responsive design, making it perfect for health education courses and medical training programs.",
      images: [
        "https://images.pexels.com/photos/7722918/pexels-photo-7722918.jpeg",
      ],
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Vue.js",
        "Responsive Design",
        "Accessibility",
      ],
      demo: "assets/interactives/flashcard-health/index.html",
    },
    {
      title: "Personalized Nursing Flashcard System with Instructor Analytics",
      description:
        "Developed using Vue.js 3, this platform empowers nursing students with an interactive flashcard experience. Students can flip cards to reveal medication information, organize their study sessions by favoriting and sorting cards, and create personalized flashcards for sharing. The application includes an instructor-facing analytics dashboard, providing insights into student engagement and progress.",
      tech: [
        "Vue.js 3",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Accessibility",
        "Responsive Design",
      ],
    },
    {
      title: "Printable PDF Functionality for LMS",
      description:
        "Developed a feature allowing students to print course content as PDFs. The feature crawls through interactive activities and extracts all content into a single print preview, enabling offline access to course materials.",
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Accessibility",
        "Responsive Design",
      ],
    },
    {
      title: "Scenario-Based Activity",
      description:
        "Created an interactive activity where students explore scenario-specific content by clicking on scenarios. Each scenario includes a quiz, and students can view and print a summary of their responses and scores. All data is saved in a database for instructor analysis with visual charts.",
      images: [
        "images/Imagexl1.jpg",
        "images/Imagexl2.jpg",
        "images/Imagexl3.jpg",
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "LMS", "Responsive Design"],
      video: "assets/videos/Program-Project-and-Portfolio-Management.webm",
    },
    {
      title: "Interactive Nursing Practice Simulator",
      description:
        "This project was a Vue.js 3 application (using the Composition API) designed to simulate healthcare nursing practice. Users interact with a responsive and fully accessible body image, clicking on designated “hotspots” to reveal detailed descriptions of specific medical scenarios. The application also includes a note-taking feature, allowing users to record observations and save their completed assessments as PDFs.",
      tech: [
        "Vue.js 3",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Accessibility",
        "Responsive Design",
      ],
    },
    {
      title: "Custom LMS Themes",
      description:
        "Developed custom themes using JavaScript and CSS to align with partner branding, enhancing LMS customization and front-end development for educational institutions.",
      tech: ["HTML5", "CSS3", "JavaScript", "LMS", "Responsive Design"],
    },
    {
      title: "Interactive Maps",
      description:
        "Implemented a click-and-reveal map feature where students click on states to display information. Used the Highcharts plugin for accessible and responsive maps.",
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
      video: "assets/videos/Prescriptive-Authority-Websites.webm",
    },
    {
      title: "Multiple Choice Activity",
      description:
        "Developed a multiple-choice quiz activity where students can select answers and print their submissions as PDFs. All responses are stored in a database for instructor review.",
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
      video: "assets/videos/Making-the-Best-of-Your-Field-Experience.webm",
    },
    {
      title: "Interactive Presentation",
      description:
        "Created a presentation feature where students can explore scenarios through buttons, with each scenario displaying information in a tabbed format.",
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
        "Contributed to the development of an in-house framework for creating responsive media content. Led the R&D team for accessibility testing and development.",
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Accessibility",
        "Responsive Design",
      ],
    },
    {
      title: "Peer Evaluation Group Activity",
      description:
        "Developed a system enabling students to evaluate their group members, while instructors can create unlimited groups with unlimited members. The system automates data storage in a database, eliminating manual effort for instructors.",
      images: [
        "images/Peernew1.jpg",
        "images/peernew2.jpg",
        "images/peernew3.jpg",
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Database", "LMS Integration"],
      video: "assets/videos/Peer-Evaluation-Form2.webm", // Corrected path
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
					${
            project.images && project.images.length > 0
              ? `
					<div class="col-md-6">
						<div class="swiper project-swiper">
							<div class="swiper-wrapper">
								${project.images
                  .map(
                    (image) => `
									<div class="swiper-slide">
										<img src="${image}" alt="${project.title}" class="project-img" />
									</div>
								`,
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
								${project.demo ? `<a href="${project.demo}" class="btn btn-sm btn-outline-primary" target="_blank" rel="noopener">View Demo</a>` : project.video ? `<a href="#" class="btn btn-sm btn-outline-primary" data-video-src="${project.video}">View Demo</a>` : ""}
								<a href="#" class="btn btn-sm btn-outline-secondary">Details</a>
							</div>
						</div>
					</div>
						`
              : `
					<div class="col-md-12">
						<div class="project-info">
							<h3 class="project-title">${project.title}</h3>
							<p class="project-description">${project.description}</p>
							<div class="project-tech">
								${project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
							</div>
							<div class="project-links">
								${project.demo ? `<a href="${project.demo}" class="btn btn-sm btn-outline-primary" target="_blank" rel="noopener">View Demo</a>` : project.video ? `<a href="#" class="btn btn-sm btn-outline-primary" data-video-src="${project.video}">View Demo</a>` : ""}
								<a href="#" class="btn btn-sm btn-outline-secondary">Details</a>
							</div>
						</div>
					</div>
						`
          }
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

  // Handle "View Demo" button clicks
  document.addEventListener("click", (e) => {
    // Only intercept if the button is for a video demo, not for a direct demo link
    if (
      e.target.classList.contains("btn-outline-primary") &&
      e.target.hasAttribute("data-video-src")
    ) {
      e.preventDefault();
      const videoSrc = e.target.getAttribute("data-video-src");
      const videoPlayer = document.getElementById("videoPlayer");
      if (videoSrc) {
        // Update the video source and reload the player
        videoPlayer.querySelector("source").src = videoSrc;
        videoPlayer.load();

        // Show the modal
        const videoModal = new bootstrap.Modal(
          document.getElementById("videoModal"),
        );
        videoModal.show();

        // Play the video automatically when the modal opens
        videoPlayer.play();
      }
    }
  });

  // Pause the video when the modal is closed
  document
    .getElementById("videoModal")
    .addEventListener("hidden.bs.modal", () => {
      const videoPlayer = document.getElementById("videoPlayer");
      videoPlayer.pause();
      videoPlayer.currentTime = 0; // Reset the video to the beginning
    });

  // Certifications data and generation
  const certifications = [
    {
      title: "Learning Next.js",
      issuer: "LinkedIn Learning",
      date: "January 2025",
    },
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
    ".certifications-container .row",
  );

  if (certificationsContainer) {
    certifications.forEach((cert) => {
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
  } else {
    console.error("Certifications container not found in the DOM.");
  }
});

// Disable right-click
//document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable text selection
//document.addEventListener("selectstart", (e) => e.preventDefault());

// Disable specific keyboard shortcuts (e.g., Ctrl+U, Ctrl+Shift+I)
document.addEventListener("keydown", (e) => {
  if (
    e.ctrlKey &&
    (e.key === "u" || e.key === "U" || e.key === "i" || e.key === "I")
  ) {
    e.preventDefault();
  }
});
