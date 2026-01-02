
/* Advanced Interactive Motion Background + Portfolio JS
   - Gesture-reactive particle cloud
   - Mobile-friendly touch support
   - Menu toggle, scroll progress, contact form handling
*/

// ====== Canvas Background ======
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width = 0, height = 0, devicePixelRatio = window.devicePixelRatio || 1;

function resizeCanvas(){
  devicePixelRatio = window.devicePixelRatio || 1;
  width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  canvas.width = Math.floor(width * devicePixelRatio);
  canvas.height = Math.floor(height * devicePixelRatio);
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
resizeCanvas();
window.addEventListener('resize', throttle(resizeCanvas, 200));

// Particle system
const PARTICLE_COUNT = 120;
const particles = [];

function rand(min, max){ return Math.random() * (max - min) + min }

class Particle{
  constructor(){
    this.reset(true);
  }
  reset(force){
    this.x = rand(0, width);
    this.y = rand(0, height);
    this.vx = rand(-0.2, 0.2);
    this.vy = rand(-0.2, 0.2);
    this.size = rand(1.5, 4.5);
    this.baseSize = this.size;
    this.life = rand(40, 200);
    this.maxLife = this.life;
    this.color = `rgba(0,212,255,${rand(0.06,0.25)})`;
    if(force) return;
  }
  step(pointer){
    // gentle floating plus pointer attraction
    const dx = pointer.x - this.x;
    const dy = pointer.y - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy) + 0.0001;
    const pull = Math.max(0, (200 - dist) / 200); // 0..1 when close
    this.vx += (dx/dist) * (0.02 * pull);
    this.vy += (dy/dist) * (0.02 * pull);

    // subtle noise motion
    this.vx += Math.sin(this.x * 0.01 + Date.now()*0.0005) * 0.0008;
    this.vy += Math.cos(this.y * 0.01 + Date.now()*0.0007) * 0.0008;

    // friction
    this.vx *= 0.985;
    this.vy *= 0.985;

    this.x += this.vx;
    this.y += this.vy;

    // wrap around edges smoothly
    if(this.x < -20) this.x = width + 20;
    if(this.x > width + 20) this.x = -20;
    if(this.y < -20) this.y = height + 20;
    if(this.y > height + 20) this.y = -20;

    // life pulse (gives breathing effect)
    const lifePct = (Math.sin((this.maxLife - this.life) * 0.05) + 1) * 0.5;
    this.size = this.baseSize * (0.75 + lifePct * 0.6);
    this.life -= 0.2;
    if(this.life <= 0) this.reset();
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

for(let i=0;i<PARTICLE_COUNT;i++) particles.push(new Particle());

// pointer state
const pointer = { x: width/2, y: height/2, down:false };

window.addEventListener('pointermove', (e)=>{
  pointer.x = e.clientX || (e.touches && e.touches[0].clientX) || pointer.x;
  pointer.y = e.clientY || (e.touches && e.touches[0].clientY) || pointer.y;
});

window.addEventListener('pointerdown', ()=>{ pointer.down = true });
window.addEventListener('pointerup', ()=>{ pointer.down = false });

// simple parallax background gradient that shifts with pointer
function drawBackground(){
  const gx = (pointer.x / width - 0.5) * 0.2;
  const gy = (pointer.y / height - 0.5) * 0.2;
  const g = ctx.createLinearGradient(0 + gx*100, 0 + gy*100, width + gx*100, height + gy*100);
  g.addColorStop(0, 'rgba(2,6,10,1)');
  g.addColorStop(0.5, 'rgba(2,26,40,1)');
  g.addColorStop(1, 'rgba(1,14,24,1)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,width,height);
}

function render(){
  ctx.clearRect(0,0,width,height);
  drawBackground();

  // draw subtle trails by drawing a translucent overlay first
  ctx.globalCompositeOperation = 'lighter';
  particles.forEach(p => { p.step(pointer); p.draw(); });
  ctx.globalCompositeOperation = 'source-over';

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

// ===== Utility: throttle =====
function throttle(fn, wait){
  let time = Date.now();
  return function(...args){
    if((time + wait - Date.now()) < 0){
      fn.apply(this, args);
      time = Date.now();
    }
  }
}

// ====== Simple Portfolio Interactions ======
// Menu toggle
const menuButton = document.getElementById('menu-button');
const navLinks = document.querySelector('.nav-links');
function toggleMenu(){
  navLinks.classList.toggle('open');
  const isExpanded = navLinks.classList.contains('open');
  menuButton.setAttribute('aria-expanded', isExpanded);
  menuButton.innerHTML = isExpanded ? '✕' : '☰';
}
menuButton.addEventListener('click', toggleMenu);

// Close mobile menu when clicking a nav link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) toggleMenu();
  });
});

// Scroll progress bar (add dynamically)
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.style.position = 'fixed';
progressBar.style.left = 0;
progressBar.style.top = 0;
progressBar.style.height = '4px';
progressBar.style.width = '0%';
progressBar.style.background = 'linear-gradient(90deg, #00d4ff, #7bfffd)';
progressBar.style.zIndex = 9999;
progressBar.setAttribute('aria-hidden','true');
document.body.appendChild(progressBar);
window.addEventListener('scroll', throttle(()=>{
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = (scrollTop / (scrollHeight || 1)) * 100;
  progressBar.style.width = pct + '%';
}, 20));

// Contact form handling
const contactForm = document.getElementById('contact-form-id');
const messageDiv = document.getElementById('form-message');
if(contactForm && messageDiv){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const nameInput = document.getElementById('name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    if(!nameInput || !emailInput){
      messageDiv.textContent = 'Please fill out all required fields.';
      messageDiv.style.color = 'tomato';
      return;
    }
    messageDiv.textContent = 'Thank you for your message! I will be in touch shortly.';
    messageDiv.style.color = 'lightgreen';
    contactForm.reset();
  });
}

// Set current year in footer
const yearSpan = document.getElementById('year');
if(yearSpan) yearSpan.textContent = new Date().getFullYear();

// End of script.js