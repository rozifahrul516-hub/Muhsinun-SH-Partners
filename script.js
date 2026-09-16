document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Menutup menu mobile saat link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // 3. Form Submit Handler (Simulasi pengiriman pesan ke WhatsApp)
    const consultationForm = document.getElementById('consultation-form');
    const formStatus = document.getElementById('form-status');

    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const category = document.getElementById('category').value;
            const message = document.getElementById('message').value;

            // Format Pesan WhatsApp
            const targetPhone = "6281234567890"; // Ganti dengan nomor WhatsApp Kantor Hukum
            const text = `Halo Kantor Hukum Muhsinun, S.H %26 Partners,%0A%0ASaya ingin berkonsultasi:%0A- *Nama*: ${encodeURIComponent(name)}%0A- *No HP*: ${encodeURIComponent(phone)}%0A- *Kategori*: ${encodeURIComponent(category)}%0A- *Pesan/Ringkasan*: ${encodeURIComponent(message)}`;

            // Tampilkan respon sukses singkat
            formStatus.className = 'form-status success';
            formStatus.innerHTML = 'Mengarahkan Anda ke WhatsApp kantor kami...';

            // Redirect ke WhatsApp setelah 1 detik
            setTimeout(() => {
                window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
                consultationForm.reset();
                formStatus.innerHTML = '';
            }, 1000);
        });
    }
});