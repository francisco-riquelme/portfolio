document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll event for navbar background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 40px';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 40px';
            navbar.style.boxShadow = 'none';
        }
        
        // Active section highlight
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Typing effect for subtitle - digit by digit
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150); // Slightly slower typing for better visibility
        }
    }
    
    setTimeout(typeWriter, 1000);
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add fade-in class and observe elements
    const fadeElements = document.querySelectorAll('.about-content, .project-card, .skills');
    fadeElements.forEach(el => {
        el.classList.add('fade-element');
        observer.observe(el);
    });
    
    // Add CSS for fade animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .project-card:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
    
    // Cursor follower effect
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-follower');
    document.body.appendChild(cursor);
    
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-follower {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease, opacity 0.3s ease;
            z-index: 9999;
            opacity: 0;
            mix-blend-mode: difference;
        }
        
        .cursor-follower.active {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
            background-color: var(--primary-color);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // Parallax effect for home section
    const homeSection = document.querySelector('#home');
    
    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            homeSection.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
        }
    });
    
    // Add a simple preloader
    const preloader = document.createElement('div');
    preloader.classList.add('preloader');
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="logo">PORTFOLIO</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    document.body.prepend(preloader);
    
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--bg-color);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .loading-bar {
            width: 200px;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.1);
            margin-top: 20px;
            position: relative;
            overflow: hidden;
        }
        
        .loading-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            animation: loading 2s ease forwards;
        }
        
        @keyframes loading {
            0% { width: 0; }
            100% { width: 100%; }
        }
    `;
    document.head.appendChild(preloaderStyle);
    
    // Hide preloader after loading
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 2000);
    });
    
    // Simulate loading if window already loaded
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 2000);
    }
    
    // Contact form functionality
    const contactForm = document.getElementById('email-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('form-success');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>¡Gracias por tu mensaje, ${name}! Te responderé lo antes posible.</p>
            `;
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
            
            // Add success message styles
            const successStyle = document.createElement('style');
            successStyle.textContent = `
                .form-success {
                    text-align: center;
                    padding: 30px;
                    animation: fadeIn 0.5s ease;
                }
                
                .form-success i {
                    font-size: 3rem;
                    color: var(--primary-color);
                    margin-bottom: 20px;
                    display: block;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(successStyle);
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted:', { name, email, subject, message });
        });
    }
});