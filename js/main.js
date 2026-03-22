/**
 * ДСУ РЦСОО „Коле Неделковски“ - Велес
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
  initActivityCarousel();
  initCounters();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initialize state on load
  handleScroll();
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

  // Use CSS animation end to trigger next slide for perfect synchronization
  const dotsContainer = document.querySelector('.testimonials-dots');
  if (dotsContainer) {
    dotsContainer.addEventListener('animationend', (e) => {
      if (e.animationName === 'dotFill' && e.target.classList.contains('active')) {
        nextSlide();
      }
    });
  }

  function updateSlides() {
    slides.forEach((slide, index) => {
      const diff = index - currentIndex;

      if (diff === 0) {
        slide.style.transform = 'translateX(0) translateZ(100px) scale(1)';
        slide.style.opacity = '1';
        slide.style.zIndex = '10';
      } else if (diff === 1 || diff === -(slides.length - 1)) {
        slide.style.transform = 'translateX(120%) translateZ(-50px) rotateY(-15deg) scale(0.85)';
        slide.style.opacity = '0.6';
        slide.style.zIndex = '5';
      } else if (diff === -1 || diff === (slides.length - 1)) {
        slide.style.transform = 'translateX(-120%) translateZ(-50px) rotateY(15deg) scale(0.85)';
        slide.style.opacity = '0.6';
        slide.style.zIndex = '5';
      } else {
        slide.style.transform = 'translateZ(-200px) scale(0.5)';
        slide.style.opacity = '0';
        slide.style.zIndex = '0';
      }
    });

    // Update dots — restart progress animation on the active dot
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        // Restart CSS animation by forcing reflow
        dot.classList.remove('active');
        void dot.offsetWidth; // force reflow
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
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

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { goToSlide(index); });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', () => slider.classList.add('is-paused'));
  slider.addEventListener('mouseleave', () => slider.classList.remove('is-paused'));

  // Initialize
  updateSlides();
}


/**
 * Scroll to top button
 */
function initScrollToTop() {
  const scrollTopBtn = document.querySelector('.scroll-to-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight) {
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
      title: 'Учениците на ДСУ РЦСОО „Коле Неделковски“ во улога на врснички едукатори за дуално образование',
      category: 'Проекти',
      categoryClass: 'projects',
      date: '6 Март 2026',
      images: ['images/vrsnicki-edukatori/card1photo1.jpg', 'images/vrsnicki-edukatori/card1photo2.jpg', 'images/vrsnicki-edukatori/card1photo3.jpg'],
      description: 'Учениците на ДСУ РЦСОО „Коле Неделковски“, Анѓела Колодезни, Матеа Христова, Борјан Бузалковски и Кристијан Димовски, денеска спроведоа работилници за дуално образование со деветоодделенци.',
      fullText: 'Учениците на ДСУ РЦСОО „Коле Неделковски“, Анѓела Колодезни, Матеа Христова, Борјан Бузалковски и Кристијан Димовски, денеска спроведоа работилници за дуално образование со деветоодделенци во ООУ „Св. Кирил и Методиј“ и ООУ „Васил Главинов“..\n\nНиз интересни интерактивни игри, врсничките едукатори ги поттикнаа учениците да зборуваат за својата идна професија. Откако открија дека најголем број од деветоодделенците себеси се гледаат како идни програмери, беа применети вежби преку кои се информираа за можностите на стручното и дуалното образование во Велес.\n\nЧеститки до вредните едукатори за успешно реализираните работилници!'
    },
    {
      id: 2,
      title: 'Снежна авантура на Попова Шапка',
      category: 'Спорт',
      categoryClass: 'sport',
      date: '1 Март 2026',
      images: ['images/sapka/card2photo1.jpg', 'images/sapka/card2photo2.jpg', 'images/sapka/card2photo3.jpg'],
      description: 'Еднодневна снежна авантура на Попова Шапка за учениците на ДСУ РЦСОО „Коле Неделковски“. Со многу насмевки, адреналин и тимски дух, нашите ученици реализираа прекрасно еднодневно скијање во зимскиот центар.',
      fullText: 'Еднодневна снежна авантура на Попова Шапка за учениците на ДСУ РЦСОО „Коле Неделковски“. Со многу насмевки, адреналин и тимски дух, нашите ученици реализираа прекрасно еднодневно скијање во зимскиот центар.\n\nУчениците, со помош на своите професори, имаа одлична можност да ги научат основите на скијањето и да ги усовршат своите вештини на снегот. Денот беше исполнет со дружење, меѓусебна поддршка и активен одмор во природа.\n\nОваа активност е дел од програмата за поттикнување здрави животни навики и спортски дух кај младите, создавајќи спомени кои долго ќе се паметат.'
    },
    {
      id: 3,
      title: 'Промотивна кампања на ДСУ РЦСОО „Коле Неделковски“ низ велешките основни училишта и околината',
      category: 'Образование',
      categoryClass: 'education',
      date: '14 Февруари 2026',
      images: ['images/prezentacii-osnovno/photo1.jpg', 'images/prezentacii-osnovno/photo2.jpg', 'images/prezentacii-osnovno/photo3.jpg'],
      description: 'Учениците и наставниот кадар на ДСУ РЦСОО „Коле Неделковски“ во изминатиов период спроведоа интензивна кампања за промоција на училиштето низ основните училишта во Велес, како и во ООУ „Рајко Жинзифов“ – с. Оризари.',
      fullText: 'Учениците и наставниот кадар на ДСУ РЦСОО „Коле Неделковски“ во изминатиов период спроведоа интензивна кампања за промоција на училиштето низ основните училишта во Велес, како и во ООУ „Рајко Жинзифов“ – с. Оризари.\n\nОвие посети се клучни за правилно професионално насочување на идните средношколци, помагајќи им да ги откријат своите таленти и да го изберат вистинскиот пат за нивната идна кариера.\n\nПреку презентации и директни средби со деветоодделенците, нашиот тим ги претстави образовните профили, современите кабинети и предностите на дуалното образование. Посебен интерес кај учениците во Оризари предизвикаа практичните вежби и можностите за брзо вработување по завршување на школувањето.\n\nГолема благодарност до сите основни училишта за гостопримството и одличната соработка во процесот на информирање на младите!'
    },
    {
      id: 4,
      title: 'Успешно претставени и наградени учениците на ДСУ РЦСОО „Коле Неделковски“ на Макинова и Еконова',
      category: 'Натпревари',
      categoryClass: 'competition',
      date: '6 Декември 2025',
      images: ['images/makinova-ekonova/photo1.jpg', 'images/makinova-ekonova/photo2.jpg', 'images/makinova-ekonova/photo3.jpg'],
      description: 'Горди сме што нашите ученици успешно учествуваа на престижните натпревари Макинова 23 и Еконова 57. Секој од учесниците покажа голема посветеност, креативност и иновативен дух, достоинствено претставувајќи го нашето училиште..',
      fullText: 'Горди сме што нашите ученици успешно учествуваа на престижните натпревари Макинова 23 и Еконова 57. Секој од учесниците покажа голема посветеност, креативност и иновативен дух, достоинствено претставувајќи го нашето училиште.\n\nПод менторство на професорката Христина Трајкова, своите вештини ги покажаа Снежана Кузманова, Јована Дојчиновска и Јована Рашевска, додека тимот на професорката Кристина Пачукова, составен од Стефанија Бојковска и Ивана Стојановска, се претстави со одлични проекти. Сите учесници заслужено се закитија со пофалници за нивниот труд.\n\nПосебно внимание привлече проектот „Софтвер за возачки дозволи“ на учениците Сара Димовска и Александар Јордановски (IV-4), изработен под водство на менторката Мимоза Пановска-Тодорова. Исто така, големи честитки упатуваме до Миа Ефтимова и Бојана Гавевска, кои заедно со менторот Марјан Малинов беа наградени и со парична награда.\n\nБраво за нашите млади таленти – продолжете да блескате и да создавате нови успеси!'
    },
    {
      id: 5,
      title: 'Успешно завршена RYCO програма: Продубено пријателство и нови искуства во Тирана',
      category: 'Пракса',
      categoryClass: 'education',
      date: '4 Декември 2025',
      images: ['images/albania2025/photo1.jpg', 'images/albania2025/photo2.jpg', 'images/albania2025/photo3.jpg'],
      description: 'Учениците на ДСУ РЦСОО „Коле Неделковски“ со голем успех ја реализираа училишната размена со врсниците од училиштето „Херман Гмајнер“ во Тирана. Во рамките на програмата поддржана од RYCO, нашите ученици активно учествуваа во тематски работилници каде ги презентираа културата, традицијата и фолклорот на двете држави.',
      fullText: 'Учениците на ДСУ РЦСОО „Коле Неделковски“ со голем успех ја реализираа училишната размена со врсниците од училиштето „Херман Гмајнер“ во Тирана. Во рамките на програмата поддржана од RYCO, нашите ученици активно учествуваа во тематски работилници каде ги презентираа културата, традицијата и фолклорот на двете држави.\n\nПосебен акцент беше ставен на делот „Спорт за развој“, каде преку наменски игри се градеше спортскиот дух, довербата и взаемното почитување помеѓу младите. Покрај едукативните активности, учениците имаа можност да го истражат и културното богатство на Тирана, посетувајќи ја Намаз Џамијата и црквата посветена на Мајка Тереза.\n\nПо неколку дена исполнети со заедништво и нови знаења, утрово нашите ученици се збогуваа со своите домаќини и тргнаа на пат кон Македонија. Оваа размена остава зад себе трајни пријателства и спомени кои долго ќе се паметат.\n\nСо нетрпение го очекуваме доаѓањето на нашите пријатели од Албанија во пролетната посета на Велес!'
    },
    {
      id: 6,
      title: 'Извонреден успех на нашите ученици на државниот натпревар „Средношколец Милионер',
      category: 'Настани',
      categoryClass: 'projects',
      date: '30 Ноември 2025',
      images: ['images/milioner/photo1.jpg', 'images/milioner/photo2.jpg', 'images/milioner/photo3.jpg'],
      description: 'Во изминатиов месец, ДСУ РЦСОО „Коле Неделковски“ со гордост беше претставено на големиот државен натпревар „Средношколец Милионер“, организиран од Brainster. Во конкуренција од дури 438 тимови од цела Македонија, нашите ученици преку тимовите „Nex$tep Finance“ и „Wearly“ покажаа дека размислуваат смело, модерно и во чекор со потребите на младите.',
      fullText: 'Во изминатиов месец, ДСУ РЦСОО „Коле Неделковски“ со гордост беше претставено на големиот државен натпревар „Средношколец Милионер“, организиран од Brainster. Во конкуренција од дури 438 тимови од цела Македонија, нашите ученици преку тимовите „Nex$tep Finance“ и „Wearly“ покажаа дека размислуваат смело, модерно и во чекор со потребите на младите.\n\nОсобено се истакна тимот „Nex$tep Finance“, составен од учениците од III-8 клас: Стефан Поповски, Ивана Милошева, Ангела Здравковска, Димитри Кочов, Марија Михајлова и Лука Панов. Нивниот пат до врвот започна во четвртфиналето, каде со неверојатни 1.759 гласа добија најголема поддршка од јавноста на ниво на цела држава, обезбедувајќи си убедливо место меѓу најдобрите.\n\nУспехот продолжи и во полуфиналето, каде тимот блесна во категоријата „Elevator Pitch“, освојувајќи го првото место за својата извонредна 90-секундна презентација и јасна визија. Во големото финале, во силна конкуренција на најиновативните идеи во земјата, тимот „Nex$tep Finance“ се пласираше на високото четврто место на државно ниво.\n\nОвој резултат, заедно со пласманот на тимот „Wearly“ во ТОП 50 идеите, претставува огромен успех за нашето училиште и силен мотив за понатамошен развој на претприемачкиот дух кај младите. Честитки до нашите ученици за нивниот труд, знаење и истрајност!'
    },
    {
      id: 7,
      title: 'Училишниот спортски турнир',
      category: 'Спорт',
      categoryClass: 'sport',
      date: '28 Февруари 2025',
      images: ['images/card7photo1.jpg', 'images/card7photo2.jpg', 'images/card7photo3.jpg'],
      description: 'Традиционалниот меѓукласен спортски турнир во мал фудбал и кошарка донесе многу возбудувања во нашата спортска сала.',
      fullText: 'Традиционалниот меѓукласен спортски турнир во мал фудбал и кошарка донесе многу возбудувања во нашата спортска сала.\n\nПобедници оваа година се учениците од IV-3 клас, кои покажаа најдобра тимска игра и спортски дух. Честитки за сите учесници!'
    }
  ];

  let currentImageIndex = 0;
  let currentActivityImages = [];
  const modalImageContainer = modal.querySelector('.modal-image');
  const navPrev = modal.querySelector('.modal-img-prev');
  const navNext = modal.querySelector('.modal-img-next');
  const navDots = modal.querySelector('.modal-img-dots');

  function updateModalImages() {
    modalImageContainer.innerHTML = '';
    navDots.innerHTML = '';

    currentActivityImages.forEach((src, idx) => {
      // Add image
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Photo ${idx + 1}`;
      // Add error handler for fallback
      img.onerror = function () {
        this.onerror = null;
        // Use placeholder if image doesn't exist
        this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23eee%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22295%22%20y%3D%22218.3%22%3EPlaceholder%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
      };
      img.style.transform = `translateX(-${currentImageIndex * 100}%)`;
      modalImageContainer.appendChild(img);

      // Add dot
      const dot = document.createElement('div');
      dot.className = `modal-img-dot ${idx === currentImageIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        currentImageIndex = idx;
        updateModalImagesTransform();
      });
      navDots.appendChild(dot);
    });
  }

  function updateModalImagesTransform() {
    const images = modalImageContainer.querySelectorAll('img');
    images.forEach(img => {
      img.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    });

    const dots = navDots.querySelectorAll('.modal-img-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentImageIndex);
    });
  }

  if (navPrev && navNext) {
    navPrev.addEventListener('click', () => {
      if (currentActivityImages.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + currentActivityImages.length) % currentActivityImages.length;
        updateModalImagesTransform();
      }
    });

    navNext.addEventListener('click', () => {
      if (currentActivityImages.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % currentActivityImages.length;
        updateModalImagesTransform();
      }
    });
  }

  function openModal(activityId) {
    const activity = activitiesData.find(a => a.id === activityId);
    if (!activity) return;

    // Set images
    currentActivityImages = activity.images || [activity.image];
    currentImageIndex = 0;
    updateModalImages();

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
    card.addEventListener('click', () => openModal(index + 1));
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
 * Activity Carousel
 */
function initActivityCarousel() {
  const container = document.querySelector('.activities-grid');
  const prevBtn = document.querySelector('.activities-nav-btn[aria-label="Previous"]');
  const nextBtn = document.querySelector('.activities-nav-btn[aria-label="Next"]');

  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = () => {
    const card = container.querySelector('.activity-card');
    if (card) {
      return card.offsetWidth + 24; // width + gap
    }
    return 300;
  };

  prevBtn.addEventListener('click', () => {
    if (container.scrollLeft <= 1) {
      // Loop to end
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener('click', () => {
    // Add 1px tolerance for sub-pixel rendering
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
      // Loop back to start
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
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
        const hasPlus = counter.hasAttribute('data-plus') || counter.textContent.includes('+');
        const duration = 2000;
        const frames = (duration / 16);
        const step = target / frames;
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + (hasPlus ? '+' : '');
          }
        };

        // Reset text and start
        counter.textContent = '0' + (hasPlus ? '+' : '');
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



// Initialize new components when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initGalleryFilter();
  initLightbox();
  initFAQ();
  initContactForm();
  initFlipbookModal();
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
 * Flipbook Modal Integration
 */
function initFlipbookModal() {
  const flipbookLinks = document.querySelectorAll('a[href*="heyzine.com"]');
  if (flipbookLinks.length === 0) return;

  const modalHtml = `
    <div id="flipbook-modal" class="flipbook-overlay">
      <div class="flipbook-modal-content">
        <button id="close-flipbook" class="flipbook-close" aria-label="Затвори">&times;</button>
        <div class="flipbook-header">
          <div class="flipbook-icon-bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
          </div>
          <h3 class="flipbook-title">Е-Весник ЕМКУС</h3>
          <p class="flipbook-subtitle">Изберете издание за читање</p>
        </div>
        <div class="flipbook-grid">
          <a href="https://heyzine.com/flip-book/1f3d1e449f99e4e2.html" target="_blank" class="flipbook-card">
            <div class="flipbook-cover cover-1">
              <div class="cover-design">
                <span class="cover-issue">БР. 1</span>
                <span class="cover-label">Е-ВЕСНИК</span>
              </div>
            </div>
            <div class="flipbook-info">
              <h4>Прво Издание</h4>
              <p>Отвори за читање</p>
              <span class="flipbook-btn">Читај <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></span>
            </div>
          </a>
          <a href="https://heyzine.com/flip-book/44ad87f9d5.html" target="_blank" class="flipbook-card">
            <div class="flipbook-cover cover-2">
              <div class="cover-design">
                <span class="cover-issue">БР. 2</span>
                <span class="cover-label">Е-ВЕСНИК</span>
              </div>
            </div>
            <div class="flipbook-info">
              <h4>Второ Издание</h4>
              <p>Отвори за читање</p>
              <span class="flipbook-btn">Читај <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('flipbook-modal');
  const closeBtn = document.getElementById('close-flipbook');

  flipbookLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', closeFlipbookModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeFlipbookModal();
  });

  function closeFlipbookModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

