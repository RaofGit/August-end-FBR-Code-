document.addEventListener('DOMContentLoaded', function() {

    // 1. Mobile Responsive Navigation Drawer
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if(mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking link (Mobile UX)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Form Submission via FormSubmit API
    const taxForm = document.getElementById('clientTaxForm');
    if(taxForm) {
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
                if(response.ok) {
                    window.location.href = "thanks.html";
                } else {
                    alert("Submission error. Please try submitting again.");
                    btn.innerText = "Submit Details";
                    btn.disabled = false;
                }
            }).catch(error => {
                alert("Network error! Please check your internet connection.");
                btn.innerText = "Submit Details";
                btn.disabled = false;
            });
        });
    }

    // 3. Automated WhatsApp Formatting & Direct Dispatch
    const whatsappBtn = document.getElementById('whatsappDirectBtn');
    if(whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const cnic = document.getElementById('cnic').value.trim();
            const service = document.getElementById('serviceRequired').value;
            const message = document.getElementById('clientMessage').value.trim();

            if(!name || !phone || !service) {
                alert("Please fill in your Name, Phone Number, and Required Service before sending to WhatsApp!");
                return; 
            }

            let whatsappText = `*NEW TAX CLIENT CONSULTATION INQUIRY*\n\n`;
            whatsappText += `👤 *Client Name:* ${name}\n`;
            whatsappText += `📞 *Phone:* ${phone}\n`;
            if (cnic) { whatsappText += `💳 *CNIC:* ${cnic}\n`; }
            whatsappText += `📋 *Service Selected:* ${service}\n`;
            if (message) { whatsappText += `💬 *Query Details:* ${message}\n`; }
            whatsappText += `\n-------------------------------\nSent from Official Tax Portal`;

            const encodedText = encodeURIComponent(whatsappText);
            const whatsappNumber = "923174807446"; 
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            window.open(whatsappURL, '_blank');
        });
    }
});
