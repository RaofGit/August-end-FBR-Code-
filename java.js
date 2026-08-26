// ================= SCRIPT INITIALIZATION ================= //
document.addEventListener('DOMContentLoaded', () => {

    // 1. ROBUST MOBILE NAVBAR TOGGLE
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. STICKY HEADER & SCROLL SPY (Active Link Highlighting)
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky Header Effect
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }

        // Scroll Spy Logic
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. CLICKABLE SERVICE CARDS (Routes to Form & selects dropdown)
    const serviceCards = document.querySelectorAll('.service-card');
    const formSelect = document.getElementById('f_service');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.getAttribute('data-service');
            selectService(serviceName);
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Global function used by Pricing buttons and Footer links
    window.selectService = function(serviceName) {
        if (formSelect) {
            for (let i = 0; i < formSelect.options.length; i++) {
                if (formSelect.options[i].value === serviceName) {
                    formSelect.selectedIndex = i;
                    break;
                }
            }
        }
    };

    // 4. FAQ ACCORDION LOGIC
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(other => {
                if(other !== item) {
                    other.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // 5. FORM SUBMISSION LOGIC (Redirect to thanks page)
    const taxForm = document.getElementById('taxForm');
    if (taxForm) {
        taxForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = taxForm.querySelector('.submit-btn');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            const formData = new FormData(taxForm);

            fetch(taxForm.action, {
                method: 'POST',
                body: formData,
            }).then(response => {
                if (response.ok) {
                    window.location.href = 'thanks.html';
                } else {
                    alert('Submission failed. Please try again.');
                    btn.innerHTML = 'Submit Application File';
                    btn.disabled = false;
                }
            }).catch(error => {
                alert('Network Error. Please check your internet connection.');
                btn.innerHTML = 'Submit Application File';
                btn.disabled = false;
            });
        });
    }

    // 6. DIRECT WHATSAPP BUTTON LOGIC IN FORM
    const waDirectBtn = document.getElementById('waDirectBtn');
    if (waDirectBtn) {
        waDirectBtn.addEventListener('click', () => {
            const name = document.getElementById('f_name').value.trim();
            const phone = document.getElementById('f_phone').value.trim();
            const cnic = document.getElementById('f_cnic').value.trim();
            const service = document.getElementById('f_service').value;
            const message = document.getElementById('f_message').value.trim();

            if (!name || !phone || !service) {
                alert('Please enter your Name, Phone Number, and select a Service before sending to WhatsApp.');
                return;
            }

            let waText = `*URGENT: TAX YEAR 2026 INQUIRY*\n\n`;
            waText += `*Name:* ${name}\n`;
            waText += `*Phone:* ${phone}\n`;
            if (cnic) waText += `*CNIC:* ${cnic}\n`;
            waText += `*Service Required:* ${service}\n`;
            if (message) waText += `*Details:* ${message}\n`;
            waText += `\n_Generated via Website_`;

            const phoneNum = "923174807446";
            const waUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(waText)}`;
            window.open(waUrl, '_blank');
        });
    }
});
