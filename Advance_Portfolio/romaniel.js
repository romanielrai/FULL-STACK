// Step 4.1: Mobile Menu Toggle [cite: 126]
const menuButton = document.getElementById('menu-button'); [cite: 140]
const navLinks = document.querySelector('.nav-links'); [cite: 141]

function toggleMenu() {
    // 1. Toggle the CSS class (controls visibility via CSS) [cite: 144]
    navLinks.classList.toggle('open'); 
    
    // 2. Update the button text/icon and accessibility attribute [cite: 145]
    const isExpanded = navLinks.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isExpanded);
    // Change icon from hamburger (☰) to X (or vice-versa)
    menuButton.innerHTML = isExpanded ? '&times;' : '&#9776;'; // X vs Hamburger
}

// Add the event handler [cite: 148]
if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
}

// Optional: Close the menu when a link inside is clicked (good mobile UX) [cite: 149]
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => { // Corrected syntax
            if (navLinks.classList.contains('open')) { [cite: 151]
                toggleMenu(); // Closes the menu
            }
        });
    });
}


// Step 4.3: Form Validation/Handling [cite: 135]
const contactForm = document.getElementById('contact-form-id'); [cite: 157] 
const messageDiv = document.getElementById('form-message'); [cite: 158]

if (contactForm && messageDiv) {
    contactForm.addEventListener('submit', function(event) {
        // Stop the browser from submitting the form and refreshing the page [cite: 161]
        event.preventDefault();

        // Get values (using IDs assumed from HTML)
        const nameInput = document.getElementById('name').value; [cite: 162]
        const emailInput = document.getElementById('email').value; [cite: 163]

        // Simple validation check for required fields
        if (nameInput === '' || emailInput === '') { [cite: 164]
            // Display an error message [cite: 138]
            messageDiv.textContent = 'Please fill out all required fields.'; [cite: 165]
            messageDiv.style.color = 'red'; [cite: 165]
        } else {
            // Successful mock submission [cite: 167]
            messageDiv.textContent = 'Thank you for your message! I will be in touch shortly.'; [cite: 168]
            messageDiv.style.color = 'green'; [cite: 169]
            contactForm.reset(); // Clear the form fields [cite: 170]
        }
    });
}

// Step 4.2: Scroll Indicator (Optional/Bonus Feature)
// To implement this, you would:
// 1. Add a div like <div id="scroll-indicator"></div> at the top of your body.
// 2. Add CSS for the indicator (fixed position, height, background, width: 0).
// 3. Add the following JS logic:

/*
window.addEventListener('scroll', () => {
    const indicator = document.getElementById('scroll-indicator');
    if (!indicator) return;

    // Calculate scroll progress (Total height - Viewport height)
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Calculate percentage and set width
    const scrolled = (scrollTop / scrollHeight) * 100;

    // Dynamically change the width [cite: 133, 134]
    indicator.style.width = scrolled + '%';
});
*/