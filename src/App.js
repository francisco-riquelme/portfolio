import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const cursorRef = useRef(null);
  const homeRef = useRef(null);

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect for subtitle
  useEffect(() => {
    const text = 'Desarrollador Full Stack & Diseñador UI/UX';
    let i = 0;
    const timer = setTimeout(() => {
      const typeWriter = () => {
        if (i < text.length) {
          setTypedText(text.substring(0, i + 1));
          i++;
          setTimeout(typeWriter, 150);
        }
      };
      typeWriter();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Cursor follower effect
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.opacity = '1';
    };

    const handleMouseDown = () => cursor.classList.add('active');
    const handleMouseUp = () => cursor.classList.remove('active');
    const handleMouseLeave = () => cursor.style.opacity = '0';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Parallax effect for home section
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth > 768 && homeRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        homeRef.current.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.padding = '15px 40px';
          navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
          navbar.style.padding = '20px 40px';
          navbar.style.boxShadow = 'none';
        }
      }

      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.about-content, .project-card, .skills');
    fadeElements.forEach(el => {
      el.classList.add('fade-element');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    const mailtoLink = `mailto:tu-email@ejemplo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="App">
      {/* Preloader */}
      {isLoading && (
        <div className="preloader">
          <div className="preloader-content">
            <div className="logo">PORTFOLIO</div>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        </div>
      )}

      {/* Cursor Follower */}
      <div ref={cursorRef} className="cursor-follower"></div>

      <div className="noise"></div>
      <div className="overlay"></div>
      
      <nav className="navbar">
        <div className="logo">PORTFOLIO</div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="#home" 
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          >
            Home
          </a>
          <a 
            href="#about" 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            About
          </a>
          <a 
            href="#projects" 
            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
          >
            Contact
          </a>
        </div>
        <div 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>

      <main>
        {/* Home Section */}
        <section id="home" className="section active" ref={homeRef}>
          <div className="container">
            <div className="glitch-wrapper">
              <h1 className="glitch" data-text="Francisco Riquelme Pérez">Francisco Riquelme Pérez</h1>
            </div>
            <h2 className="subtitle">
              <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
            </h2>
            <div className="cta-buttons">
              <a 
                href="#projects" 
                className="btn primary futuristic"
                onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              >
                Ver Proyectos
              </a>
            </div>
            <div className="scroll-indicator">
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <div className="arrow">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">Sobre <span className="highlight">Mí</span></h2>
            <div className="about-content">
              <div className="about-image">
                <div className="image-container">
                  <div className="image-glitch"></div>
                </div>
              </div>
              <div className="about-text">
                <p>Soy un desarrollador web apasionado por crear experiencias digitales innovadoras y futuristas. Me especializo en construir interfaces que no solo son visualmente impactantes, sino también altamente funcionales.</p>
                <p>Mi enfoque combina diseño creativo con soluciones técnicas sólidas para crear proyectos web que destacan en el panorama digital actual.</p>
                
                <div className="skills">
                  <h3>Habilidades</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">HTML5</span>
                    <span className="skill-tag">CSS3</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">UI/UX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container">
            <h2 className="section-title">Mis <span className="highlight">Proyectos</span></h2>
            <div className="projects-grid">
              {/* Project 1 */}
              <div className="project-card">
                <div className="project-image">
                  <div className="image-overlay"></div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">Proyecto Futurista</h3>
                  <p className="project-description">Una aplicación web con diseño futurista y funcionalidades avanzadas.</p>
                  <div className="project-tags">
                    <span className="project-tag">React</span>
                    <span className="project-tag">Three.js</span>
                    <span className="project-tag">GSAP</span>
                  </div>
                  <div className="project-links">
                    <button className="project-link" onClick={() => window.open('https://example.com', '_blank')} aria-label="Ver proyecto">
                      <i className="fas fa-external-link-alt"></i>
                    </button>
                    <button className="project-link" onClick={() => window.open('https://github.com/francisco-riquelme', '_blank')} aria-label="Ver código en GitHub">
                      <i className="fab fa-github"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Project 2 */}
              <div className="project-card">
                <div className="project-image">
                  <div className="image-overlay"></div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">Experiencia Inmersiva</h3>
                  <p className="project-description">Una experiencia web inmersiva con efectos visuales innovadores.</p>
                  <div className="project-tags">
                    <span className="project-tag">JavaScript</span>
                    <span className="project-tag">WebGL</span>
                    <span className="project-tag">Canvas</span>
                  </div>
                  <div className="project-links">
                    <button className="project-link" onClick={() => window.open('https://example.com', '_blank')} aria-label="Ver proyecto">
                      <i className="fas fa-external-link-alt"></i>
                    </button>
                    <button className="project-link" onClick={() => window.open('https://github.com/francisco-riquelme', '_blank')} aria-label="Ver código en GitHub">
                      <i className="fab fa-github"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Project 3 */}
              <div className="project-card">
                <div className="project-image">
                  <div className="image-overlay"></div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">Interfaz Neomórfica</h3>
                  <p className="project-description">Diseño de interfaz neomórfica con interacciones fluidas y modernas.</p>
                  <div className="project-tags">
                    <span className="project-tag">HTML5</span>
                    <span className="project-tag">CSS3</span>
                    <span className="project-tag">JavaScript</span>
                  </div>
                  <div className="project-links">
                    <button className="project-link" onClick={() => window.open('https://example.com', '_blank')} aria-label="Ver proyecto">
                      <i className="fas fa-external-link-alt"></i>
                    </button>
                    <button className="project-link" onClick={() => window.open('https://github.com/francisco-riquelme', '_blank')} aria-label="Ver código en GitHub">
                      <i className="fab fa-github"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container">
            <h2 className="section-title">Contacta <span className="highlight">Conmigo</span></h2>
            <div className="contact-content">
              <div className="contact-info">
                <p>¿Tienes un proyecto en mente o quieres hablar sobre una colaboración? No dudes en contactarme a través del formulario o mis redes sociales.</p>
                <div className="contact-details">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>francisco.riquelme.perez1999@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Santiago, Región Metropolitana</span>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Nombre" required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <input type="text" name="subject" placeholder="Asunto" required />
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Mensaje" required></textarea>
                  </div>
                  <button type="submit" className="btn primary">Enviar Mensaje</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">PORTFOLIO</div>
            <div className="social-links">
              <a href="https://github.com/francisco-riquelme" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/francisco-riquelme-pérez-3293a4251" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:francisco.riquelme.perez1999@gmail.com" className="social-link">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Francisco Riquelme Pérez. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/56944444444" 
        className="whatsapp-button" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}

export default App;
