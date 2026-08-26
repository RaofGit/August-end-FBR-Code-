document.addEventListener('DOMContentLoaded', function() {

    // 1. Mobile Menu Drawer Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // 2. Navigation Smooth Scrolling & Active State
    const navItems = document.querySelectorAll('.nav-links a.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 3. Whole-Card Clickable Service Integration
    const clickableCards = document.querySelectorAll('.clickable-card');
    const serviceSelect = document.getElementById('serviceRequired');

    clickableCards.forEach(card => {
        card.addEventListener('click', function() {
            const selectedService = this.getAttribute('data-service');
            
            if (serviceSelect && selectedService) {
                for (let i = 0; i < serviceSelect.options.length; i++) {
                    if (serviceSelect.options[i].value === selectedService) {
                        serviceSelect.selectedIndex = i;
                        break;
                    }
                }
            }

            const appointmentSection = document.getElementById('appointment');
            if (appointmentSection) {
                appointmentSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Client Form Submission Handling
    const taxForm = document.getElementById('clientTaxForm');
    if (taxForm) {
        taxForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const form = e.target;
            const formData = new FormData(form);
            const btn = form.querySelector('.form-submit');
            
            btn.innerText = "Submitting Details...";
            btn.disabled = true;
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
            }).then(response => {
                if (response.ok) {
                    window.location.href = "thanks.html";
                } else {
                    alert("Submission Error. Please retry.");
                    btn.innerText = "Submit Form Details";
                    btn.disabled = false;
                }
            }).catch(error => {
                alert("Network error! Please check your internet connection.");
                btn.innerText = "Submit Form Details";
                btn.disabled = false;
            });
        });
    }

    // 5. WhatsApp Direct Message Pre-formatter
    const whatsappBtn = document.getElementById('whatsappDirectBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const cnic = document.getElementById('cnic').value.trim();
            const service = document.getElementById('serviceRequired').value;
            const message = document.getElementById('clientMessage').value.trim();

            if (!name || !phone || !service) {
                alert("Kindly fill in your Name, Phone Number, and Service first.");
                return; 
            }

            let whatsappText = `*TAX YEAR 2026 CONSULTATION INQUIRY*\n\n`;
            whatsappText += `👤 *Name:* ${name}\n`;
            whatsappText += `📞 *Phone:* ${phone}\n`;
            if (cnic) { whatsappText += `💳 *CNIC/Business:* ${cnic}\n`; }
            whatsappText += `📋 *Service Needed:* ${service}\n`;
            if (message) { whatsappText += `💬 *Query Details:* ${message}\n`; }
            whatsappText += `\n-------------------------------\nSent from FBR Tax Advisory Portal`;

            const encodedText = encodeURIComponent(whatsappText);
            const whatsappNumber = "923174807446"; 
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            window.open(whatsappURL, '_blank');
        });
    }
});
