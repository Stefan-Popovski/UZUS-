/**
 * ДСУ РЦСОО "Коле Неделковски" - Велес
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavbar();
  initMobileMenu();
  initSearchBar();
  initScrollAnimations();
  initTestimonialsSlider();
  initScrollToTop();
  initActivityModals();
  initCounters();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.navbar-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtns = document.querySelectorAll('.mobile-menu-overlay, .mobile-menu-link');

  if (!menuBtn || !mobileMenu || !overlay) return;

  menuBtn.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Search bar toggle
 */
function initSearchBar() {
  const searchBtn = document.querySelector('.navbar-btn[aria-label="Search"]');
  const searchBar = document.querySelector('.search-bar');

  if (!searchBtn || !searchBar) return;

  searchBtn.addEventListener('click', function() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
      searchBar.querySelector('input').focus();
    }
  });

  // Close search bar when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
      searchBar.classList.remove('active');
    }
  });
}

/**
 * Scroll animations (reveal on scroll)
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Testimonials Slider
 */
function initTestimonialsSlider() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonials-dot');
  const prevBtn = document.querySelector('.testimonials-nav.prev');
  const nextBtn = document.querySelector('.testimonials-nav.next');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayInterval;

  function updateSlides() {
    slides.forEach((slide, index) => {
      const diff = index - currentIndex;
      
      if (diff === 0) {
        // Current slide
        slide.style.transform = 'translateX(0) translateZ(100px) scale(1)';
        slide.style.opacity = '1';
        slide.style.zIndex = '10';
      } else if (diff === 1 || diff === -(slides.length - 1)) {
        // Next slide
        slide.style.transform = 'translateX(120%) translateZ(-50px) rotateY(-15deg) scale(0.85)';
        slide.style.opacity = '0.6';
        slide.style.zIndex = '5';
      } else if (diff === -1 || diff === (slides.length - 1)) {
        // Previous slide
        slide.style.transform = 'translateX(-120%) translateZ(-50px) rotateY(15deg) scale(0.85)';
        slide.style.opacity = '0.6';
        slide.style.zIndex = '5';
      } else {
        // Hidden slides
        slide.style.transform = 'translateZ(-200px) scale(0.5)';
        slide.style.opacity = '0';
        slide.style.zIndex = '0';
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;
    updateSlides();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { stopAutoplay(); goToSlide(index); startAutoplay(); });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Initialize
  updateSlides();
  startAutoplay();
}

/**
 * Scroll to top button
 */
function initScrollToTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Activity/News Modals
 */
function initActivityModals() {
  const activityCards = document.querySelectorAll('.activity-card');
  const modalOverlay = document.querySelector('.modal-overlay');
  
  if (!modalOverlay) return;

  const modal = modalOverlay.querySelector('.modal');
  const modalClose = modalOverlay.querySelector('.modal-close');

  // Activity data
  const activitiesData = [
    {
      id: 1,
      title: 'Одбојкарите најдобри во општина Велес',
      category: 'Спорт',
      categoryClass: 'sport',
      date: '15 Октомври 2025',
      image: 'images/activity-volleyball.jpg',
      description: 'Одбојкарската екипа на ДСУ РЦСОО "Коле Неделковски" го освои првото место на општинското првенство во одбојка за средно образование. Нашите ученици покажаа одлична игра и тимски дух, победувајќи ги сите противници во турнирот.',
      fullText: 'Одбојкарската екипа на ДСУ РЦСОО "Коле Неделковски" го освои првото место на општинското првенство во одбојка за средно образование. Нашите ученици покажаа одлична игра и тимски дух, победувајќи ги сите противници во турнирот.\n\nОваа победа е резултат на долгогодишната работа на нашите тренери и посветеноста на учениците кои редовно тренираат. Екипата ќе продолжи да се подготвува за регионалното првенство кое ќе се одржи следниот месец.\n\nЧеститки до сите членови на екипата и нивните тренери!'
    },
    {
      id: 2,
      title: 'Еразмус+ проект - Меѓународна соработка',
      category: 'Проекти',
      categoryClass: 'projects',
      date: '10 Септември 2025',
      image: 'images/activity-erasmus.jpg',
      description: 'Училиштето учествува во Еразмус+ програмата за размена со училишта од Германија, Италија и Полска. Проектот е фокусиран на развој на дигиталните вештини и иновации во стручното образование.',
      fullText: 'Училиштето учествува во Еразмус+ програмата за размена со училишта од Германија, Италија и Полска. Проектот е фокусиран на развој на дигиталните вештини и иновации во стручното образование.\n\nВо рамки на проектот, нашите ученици и наставници ќе имаат можност за размена со партнерските училишта, учење од најдобрите практики и стекнување на меѓународно искуство.\n\nПроектот е финансиран од Европската Унија и ќе трае две години.'
    },
    {
      id: 3,
      title: 'Дуално образование со компаниите',
      category: 'Образование',
      categoryClass: 'education',
      date: '5 Септември 2025',
      image: 'images/activity-mechanics.jpg',
      description: 'Соработка со компании како Rontis, Kromberg & Schubert и други за практична обука на учениците. Учениците имаат можност да стекнат реално работно искуство уште за време на школувањето.',
      fullText: 'Соработка со компании како Rontis, Kromberg & Schubert и други за практична обука на учениците. Учениците имаат можност да стекнат реално работно искуство уште за време на школувањето.\n\nПрограмата за дуално образование овозможува учениците да поминат дел од своето време во реални работни средини, каде што се обучуваат од искусни професионалци.\n\nПо завршувањето на образованието, многу ученици се вработуваат директно во компаниите каде што ја извршувале праксата.'
    },
    {
      id: 4,
      title: 'Натпревар во електротехника',
      category: 'Натпревари',
      categoryClass: 'competition',
      date: '20 Мај 2025',
      image: 'images/activity-electronics.jpg',
      description: 'Нашите ученици освоија награди на државниот натпревар во електротехничка струка. Натпреварот се одржа во Скопје и на него учествуваа ученици од цела Македонија.',
      fullText: 'Нашите ученици освоија награди на државниот натпревар во електротехничка струка. Натпреварот се одржа во Скопје и на него учествуваа ученици од цела Македонија.\n\nНашиот ученик Петар Стојановски освои прво место во категоријата електронски кола, додека Ана Николова освои трето место во програмирање на PLC системи.\n\nЧеститки до сите учесници и нивните ментори!'
    }
  ];

  function openModal(activityId) {
    const activity = activitiesData.find(a => a.id === activityId);
    if (!activity) return;

    modal.querySelector('.modal-image img').src = activity.image;
    modal.querySelector('.modal-image img').alt = activity.title;
    modal.querySelector('.modal-badge').textContent = activity.category;
    modal.querySelector('.modal-badge').className = `modal-badge ${activity.categoryClass}`;
    modal.querySelector('.modal-title').textContent = activity.title;
    modal.querySelector('.modal-meta span').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${activity.date}`;
    
    // Convert newlines to paragraphs
    const paragraphs = activity.fullText.split('\n\n').map(p => `<p>${p}</p>`).join('');
    modal.querySelector('.modal-text').innerHTML = paragraphs;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  activityCards.forEach((card, index) => {
    card.addEventListener('click', () => openModal(activitiesData[index].id));
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * Animated counters
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/**
 * Gallery Filter
 */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      // Filter items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Gallery Lightbox
 */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  
  if (!lightbox || galleryItems.length === 0) return;

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const items = Array.from(galleryItems).filter(item => item.style.display !== 'none');

  function openLightbox(index) {
    const item = items[index];
    const img = item.querySelector('img');
    const title = item.querySelector('h3')?.textContent || '';
    const desc = item.querySelector('p')?.textContent || '';

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = title + (desc ? ' - ' + desc : '');
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentIndex = index;
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  nextBtn?.addEventListener('click', nextImage);
  prevBtn?.addEventListener('click', prevImage);

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

/**
 * FAQ Accordion
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Contact Form
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
      alert('Ве молиме пополнете ги сите задолжителни полиња.');
      return;
    }

    if (!data.privacy) {
      alert('Ве молиме прифатете ги условите за користење.');
      return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Испраќам...';

    setTimeout(() => {
      alert('Вашата порака е успешно испратена! Ќе ве контактираме наскоро.');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1500);
  });
}

/**
 * Stats Counter Animation
 */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const target = parseInt(text.replace(/\D/g, ''));
        
        if (isNaN(target)) return;

        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = target + (hasPlus ? '+' : '');
          }
        };

        updateCounter();
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}

// Initialize new components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initGalleryFilter();
  initLightbox();
  initFAQ();
  initContactForm();
  initStatsCounter();
});

// Add fadeInUp animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
