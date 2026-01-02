// Menu Toggle (Mobile)
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = mobileMenuToggle.querySelector('i');
  icon.classList.toggle('ri-menu-line');
  icon.classList.toggle('ri-close-line');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuToggle.querySelector('i').classList.add('ri-menu-line');
    mobileMenuToggle.querySelector('i').classList.remove('ri-close-line');
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Active Nav on Scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-indicator').style.width = scrolled + '%';
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor2.style.left = e.clientX + 'px';
  cursor2.style.top = e.clientY + 'px';
});

// Audio on Project Hover (Optional)
const audio = document.getElementById('hover-sound');
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => audio.play().catch(() => {}));
});

// Form Validation
const form = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');
const errors = {
  name: document.getElementById('name-error'),
  email: document.getElementById('email-error'),
  message: document.getElementById('message-error')
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  // Reset errors
  Object.values(errors).forEach(err => err.textContent = '');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();

  if (!name) {
    errors.name.textContent = 'Name is required';
    valid = false;
  }
  if (!email || !email.includes('@')) {
    errors.email.textContent = 'Valid email is required';
    valid = false;
  }
  if (!msg) {
    errors.message.textContent = 'Message is required';
    valid = false;
  }

  if (valid) {
    messageDiv.textContent = 'Thank you! I\'ll be in touch soon.';
    messageDiv.style.color = 'green';
    form.reset();
  } else {
    messageDiv.textContent = 'Please fix the errors above.';
    messageDiv.style.color = 'red';
  }
});

// Swiper for Testimonials
new Swiper('.testimonials-swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 5000,
  },
});

// ScrollReveal Animations
ScrollReveal().reveal('.section', { origin: 'top', distance: '50px', duration: 1000, delay: 200 });
ScrollReveal().reveal('.project-card, .service-card, .testimonial-card', { origin: 'bottom', distance: '30px', duration: 800, interval: 200 });

// Typewriter Effect for Hero (Simple JS)
const typeText = document.querySelector('.type-text');
const texts = ['Alex Rivera', 'A Frontend Developer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  typeText.textContent = currentText.substring(0, charIndex);
  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(typeWriter, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeWriter, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(typeWriter, isDeleting ? 50 : 1000);
  }
}
typeWriter();