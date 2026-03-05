/**
 * ДСУ РЦСОО "Коле Неделковски" - Велес
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function () {
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

  window.addEventListener('scroll', function () {
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

  menuBtn.addEventListener('click', function () {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
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

  searchBtn.addEventListener('click', function () {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
      searchBar.querySelector('input').focus();
    }
  });

  // Close search bar when clicking outside
  document.addEventListener('click', function (e) {
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
    autoplayInterval = setInterval(nextSlide, 4000);
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

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Activity/News Modals + Carousel Pagination
 */
function initActivityModals() {
  const activityCards = document.querySelectorAll('.activity-card');
  const modalOverlay = document.querySelector('.modal-overlay');

  if (!modalOverlay) return;

  const modal = modalOverlay.querySelector('.modal');
  const modalClose = modalOverlay.querySelector('.modal-close');

  // Activities carousel pagination
  const activitiesPages = document.querySelectorAll('.activities-page');
  const prevPageBtn = document.querySelector('.activities-nav-btn[aria-label="Previous"]');
  const nextPageBtn = document.querySelector('.activities-nav-btn[aria-label="Next"]');
  let currentPage = 0;
  const totalPages = activitiesPages.length;

  function showPage(pageIndex) {
    activitiesPages.forEach((page, i) => {
      if (i === pageIndex) {
        page.classList.add('active');
        page.style.animation = 'fadeInUp 0.5s ease';
        // Re-trigger reveal animations for new page cards
        const cards = page.querySelectorAll('.activity-card');
        cards.forEach((card, ci) => {
          card.classList.add('reveal', 'active');
          card.style.animationDelay = (ci * 0.1) + 's';
        });
      } else {
        page.classList.remove('active');
      }
    });
    currentPage = pageIndex;
  }

  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      const newPage = currentPage > 0 ? currentPage - 1 : totalPages - 1;
      showPage(newPage);
    });
  }
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
      const newPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
      showPage(newPage);
    });
  }

  // Activity data with multiple images each
  const activitiesData = [
    {
      id: 1,
      title: 'Одбојкарите најдобри во општина Велес',
      category: 'Спорт',
      categoryClass: 'sport',
      date: '15 Октомври 2025',
      images: ['images/activity-1-img1.jpg', 'images/activity-1-img2.jpg', 'images/activity-1-img3.jpg'],
      fullText: 'Одбојкарската екипа на ДСУ РЦСОО "Коле Неделковски" го освои првото место на општинското првенство во одбојка за средно образование. Нашите ученици покажаа одлична игра и тимски дух, победувајќи ги сите противници во турнирот.\n\nОваа победа е резултат на долгогодишната работа на нашите тренери и посветеноста на учениците кои редовно тренираат. Екипата ќе продолжи да се подготвува за регионалното првенство кое ќе се одржи следниот месец.\n\nЧеститки до сите членови на екипата и нивните тренери!'
    },
    {
      id: 2,
      title: 'Еразмус+ проект - Меѓународна соработка',
      category: 'Проекти',
      categoryClass: 'projects',
      date: '10 Септември 2025',
      images: ['images/activity-2-img1.jpg', 'images/activity-2-img2.jpg', 'images/activity-2-img3.jpg'],
      fullText: 'Училиштето учествува во Еразмус+ програмата за размена со училишта од Германија, Италија и Полска. Проектот е фокусиран на развој на дигиталните вештини и иновации во стручното образование.\n\nВо рамки на проектот, нашите ученици и наставници ќе имаат можност за размена со партнерските училишта, учење од најдобрите практики и стекнување на меѓународно искуство.\n\nПроектот е финансиран од Европската Унија и ќе трае две години.'
    },
    {
      id: 3,
      title: 'Дуално образование со компаниите',
      category: 'Образование',
      categoryClass: 'education',
      date: '5 Септември 2025',
      images: ['images/activity-3-img1.jpg', 'images/activity-3-img2.jpg', 'images/activity-3-img3.jpg'],
      fullText: 'Соработка со компании како Rontis, Kromberg & Schubert и други за практична обука на учениците. Учениците имаат можност да стекнат реално работно искуство уште за време на школувањето.\n\nПрограмата за дуално образование овозможува учениците да поминат дел од своето време во реални работни средини, каде што се обучуваат од искусни професионалци.\n\nПо завршувањето на образованието, многу ученици се вработуваат директно во компаниите каде што ја извршувале праксата.'
    },
    {
      id: 4,
      title: 'Натпревар во електротехника',
      category: 'Натпревари',
      categoryClass: 'competition',
      date: '20 Мај 2025',
      images: ['images/activity-4-img1.jpg', 'images/activity-4-img2.jpg', 'images/activity-4-img3.jpg'],
      fullText: 'Нашите ученици освоија награди на државниот натпревар во електротехничка струка. Натпреварот се одржа во Скопје и на него учествуваа ученици од цела Македонија.\n\nНашиот ученик Петар Стојановски освои прво место во категоријата електронски кола, додека Ана Николова освои трето место во програмирање на PLC системи.\n\nЧеститки до сите учесници и нивните ментори!'
    },
    {
      id: 5,
      title: 'Ден на отворени врати',
      category: 'Настани',
      categoryClass: 'education',
      date: '15 Март 2025',
      images: ['images/activity-5-img1.jpg', 'images/activity-5-img2.jpg', 'images/activity-5-img3.jpg'],
      fullText: 'Училиштето ги отвори вратите за идните ученици и нивните родители. Посетителите имаа можност да ги видат работилниците и лабораториите.\n\nНа денот на отворени врати, професорите ги презентираа сите четири струки и нивните образовни профили. Учениците демонстрираа практични проекти и ги споделија своите искуства.\n\nОваа година, настанот привлече рекорден број на посетители заинтересирани за упис.'
    },
    {
      id: 6,
      title: 'Роботика клуб - Нови проекти',
      category: 'Образование',
      categoryClass: 'projects',
      date: '20 Јануари 2025',
      images: ['images/activity-6-img1.jpg', 'images/activity-6-img2.jpg', 'images/activity-6-img3.jpg'],
      fullText: 'Учениците од роботика клубот започнаа работа на нови проекти за автоматизација и програмирање на роботи.\n\nВо овој семестар, клубот работи на проект за автоматизиран систем за сортирање, користејќи Arduino и сензори. Учениците учат програмирање, електроника и механички дизајн.\n\nРоботика клубот е отворен за сите ученици кои сакаат да научат повеќе за технологијата и иновациите.'
    },
    {
      id: 7,
      title: 'Кулинарски фестивал',
      category: 'Проекти',
      categoryClass: 'sport',
      date: '10 Ноември 2024',
      images: ['images/activity-7-img1.jpg', 'images/activity-7-img2.jpg', 'images/activity-7-img3.jpg'],
      fullText: 'Учениците од угостителската струка организираа кулинарски фестивал со традиционални и модерни јадења.\n\nНа фестивалот беа претставени над 30 различни јадења подготвени од учениците под менторство на нивните професори. Посетителите имаа можност да дегустираат и да гласаат за најдоброто јадење.\n\nОваа активност е дел од практичната настава и им помага на учениците да ги усовршат своите кулинарски вештини.'
    }
  ];

  // Modal image carousel state
  let currentModalImageIndex = 0;
  let currentModalImages = [];

  function updateModalImage() {
    const mainImg = modal.querySelector('.modal-main-image');
    const dotsContainer = modal.querySelector('.modal-image-dots');
    const counter = modal.querySelector('.modal-image-counter');

    // Add fade-in animation
    mainImg.classList.add('fade-in-active');

    // Set a short timeout to allow the browser to process the visual change, then swap image
    setTimeout(() => {
      mainImg.src = currentModalImages[currentModalImageIndex];
      counter.textContent = (currentModalImageIndex + 1) + ' / ' + currentModalImages.length;

      // Update dots
      const dots = dotsContainer.querySelectorAll('.modal-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentModalImageIndex);
      });

      // Remove fade-in class after animation completes
      setTimeout(() => {
        mainImg.classList.remove('fade-in-active');
      }, 300);
    }, 50); // slight delay to make transition smoother
  }

  function openModal(activityId) {
    const activity = activitiesData.find(a => a.id === activityId);
    if (!activity) return;

    currentModalImages = activity.images;
    currentModalImageIndex = 0;

    const mainImg = modal.querySelector('.modal-main-image');
    mainImg.src = activity.images[0];
    mainImg.alt = activity.title;

    modal.querySelector('.modal-badge').textContent = activity.category;
    modal.querySelector('.modal-badge').className = `modal-badge ${activity.categoryClass}`;
    modal.querySelector('.modal-title').textContent = activity.title;
    modal.querySelector('.modal-meta span').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${activity.date}`;

    // Build image dots
    const dotsContainer = modal.querySelector('.modal-image-dots');
    dotsContainer.innerHTML = '';
    activity.images.forEach((img, i) => {
      const dot = document.createElement('button');
      dot.className = 'modal-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        currentModalImageIndex = i;
        updateModalImage();
      });
      dotsContainer.appendChild(dot);
    });

    // Counter
    modal.querySelector('.modal-image-counter').textContent = '1 / ' + activity.images.length;

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

  // Modal image navigation
  const imgPrevBtn = modal.querySelector('.modal-img-prev');
  const imgNextBtn = modal.querySelector('.modal-img-next');

  if (imgPrevBtn) {
    imgPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentModalImageIndex = currentModalImageIndex > 0 ? currentModalImageIndex - 1 : currentModalImages.length - 1;
      updateModalImage();
    });
  }
  if (imgNextBtn) {
    imgNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentModalImageIndex = currentModalImageIndex < currentModalImages.length - 1 ? currentModalImageIndex + 1 : 0;
      updateModalImage();
    });
  }

  activityCards.forEach(card => {
    card.addEventListener('click', () => {
      const activityId = parseInt(card.getAttribute('data-activity'));
      openModal(activityId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
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
  anchor.addEventListener('click', function (e) {
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
    btn.addEventListener('click', function () {
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

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
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

    question.addEventListener('click', function () {
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

  form.addEventListener('submit', function (e) {
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
document.addEventListener('DOMContentLoaded', function () {
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

/**
 * Multi-Language Support
 */
function initLanguage() {
  const langSelector = document.querySelectorAll('.lang-btn');
  const storedLang = localStorage.getItem('site_language') || 'mk';

  // Set initial language
  setLanguage(storedLang);

  // Update active state in custom dropdown if it exists
  const updateDropdownUI = (lang) => {
    // If there is a dropdown selector with flags
    const currentLangFlags = document.querySelectorAll('.current-lang-flag');

    let flagSrc = '';
    if (lang === 'mk') flagSrc = 'images/flag-mk.png'; // Will create these or use emojis
    else if (lang === 'en') flagSrc = 'images/flag-en.png';
    else if (lang === 'al') flagSrc = 'images/flag-al.png';

    // If we use emojis instead of images for simplicity:
    let flagEmoji = '🇲🇰';
    if (lang === 'en') flagEmoji = '🇬🇧';
    if (lang === 'al') flagEmoji = '🇦🇱';

    const currentLangSpans = document.querySelectorAll('.current-lang-name');
    currentLangSpans.forEach(span => {
      span.textContent = lang.toUpperCase();
    });

    const currFlags = document.querySelectorAll('.current-lang-emoji');
    currFlags.forEach(f => {
      f.textContent = flagEmoji;
    });
  };

  updateDropdownUI(storedLang);

  // Add event listeners to language buttons
  langSelector.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const selectedLang = this.getAttribute('data-lang');
      localStorage.setItem('site_language', selectedLang);
      setLanguage(selectedLang);
      updateDropdownUI(selectedLang);

      // Close dropdown if it's open
      const dropdown = this.closest('.lang-dropdown');
      if (dropdown) dropdown.classList.remove('active');
    });
  });

  // Language Dropdown Toggle
  const langToggles = document.querySelectorAll('.lang-toggle');
  langToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = this.nextElementSibling;
      if (dropdown) {
        document.querySelectorAll('.lang-dropdown').forEach(d => {
          if (d !== dropdown) d.classList.remove('active');
        });
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.lang-selector')) {
      document.querySelectorAll('.lang-dropdown').forEach(d => d.classList.remove('active'));
    }
  });
}

function setLanguage(lang) {
  if (!window.translations || !window.translations[lang]) return;

  const dict = window.translations[lang];
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      // For inputs and textareas, update placeholder
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        // Keep icons inside elements like buttons by using innerHTML replacement properly, 
        // but for now let's just replace text content if no children, or be careful with SVGs.
        // If there is an SVG, we might need to preserve it.
        const svg = el.querySelector('svg');
        const badge = el.querySelector('.cta-trust-dot, .activity-badge, .about-badge-icon'); // Common specific selectors

        if (svg) {
          // Attempt to keep the SVG and replace only the text node next to it
          // A bit tricky, simplest way is to put the text in a <span> inside the button and target that span with data-i18n.
          // Since we are adding data-i18n, we assume the element specifically wraps the text.
          el.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
              node.textContent = dict[key];
            }
          });
        } else {
          // Direct replacement
          if (!el.children.length || el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'A' || el.tagName === 'LI') {
            el.textContent = dict[key];
          }
        }
      }
    }
  });

  document.documentElement.lang = lang;
}

// Ensure initLanguage runs
document.addEventListener('DOMContentLoaded', initLanguage);
