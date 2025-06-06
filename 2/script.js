document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTopBtn = document.getElementById('backToTop');
    const heroSlider = document.querySelector('.hero');
    const heroDots = document.querySelectorAll('.dot');
    const heroNext = document.querySelector('.hero-next');
    const heroPrev = document.querySelector('.hero-prev');

    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    let currentSlide = 0;
    const slides = [
        {
            title: "Leading the Way in Smart Energy Solutions",
            subtitle: "Pioneering advanced energy technologies for a brighter future"
        },
        {
            title: "Comprehensive Energy Audit Services", 
            subtitle: "Optimize your energy consumption and reduce costs"
        },
        {
            title: "Water Conservation Solutions",
            subtitle: "Sustainable water management for industrial facilities"
        },
        {
            title: "Safety First Approach",
            subtitle: "Ensuring workplace compliance and security standards"
        }
    ];

    function updateSlide() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.textContent = slides[currentSlide].title;
            heroSubtitle.textContent = slides[currentSlide].subtitle;
            heroTitle.style.opacity = '1';
            heroSubtitle.style.opacity = '1';
        }, 300);

        heroDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }

    heroNext.addEventListener('click', nextSlide);
    heroPrev.addEventListener('click', prevSlide);

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });

    setInterval(nextSlide, 5000);

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    heroTitle.style.transition = 'opacity 0.3s ease';
    heroSubtitle.style.transition = 'opacity 0.3s ease';

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const serviceElements = document.querySelectorAll('.service-section');
    serviceElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceSection = this.closest('.service-section');
            const sectionId = serviceSection.id;
            
            console.log(`Read more clicked for: ${sectionId}`);
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                this.innerHTML = 'Read More <i class="fas fa-play"></i>';
            }, 1500);
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});
document.getElementsByClassName("dropdown-toggle")[0].addEventListener("click",()=>{
    document.getElementsByClassName("mega-dropdown")[0].style.display = "flex"
})
