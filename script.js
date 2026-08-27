// ===== PRELOADER =====
window.addEventListener('load', function() {
  var preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(function() {
      preloader.classList.add('hidden');
      setTimeout(function() { preloader.remove(); }, 600);
    }, 1000);
  }
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// ===== HAMBURGER MENU =====
var hamburger = document.getElementById('hamburger');
var navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', function() {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.position = 'fixed';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'var(--olive-leaf)';
    navLinks.style.flexDirection = 'column';
    navLinks.style.padding = '20px';
    navLinks.style.gap = '16px';
    navLinks.style.zIndex = '999';
  });
}

// ===== SCROLL ANIMATIONS =====
var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(function(el) {
  observer.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      var offset = 80;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
    if (navLinks && window.innerWidth <= 900) {
      navLinks.style.display = 'none';
    }
  });
});

// ===== LIGHTBOX =====
var lightboxImages = [];
var currentLightboxIndex = 0;

document.querySelectorAll('.portfolio-item').forEach(function(item) {
  var img = item.querySelector('img');
  if (img) {
    lightboxImages.push(img.src);
  }
});

function openLightbox(src) {
  var lightbox = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  var counter = document.getElementById('lightboxCounter');
  if (!lightbox || !img) return;
  
  currentLightboxIndex = lightboxImages.indexOf(src);
  if (currentLightboxIndex === -1) currentLightboxIndex = 0;
  
  img.src = src;
  if (counter) counter.textContent = (currentLightboxIndex + 1) + ' / ' + lightboxImages.length;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
  var img = document.getElementById('lightbox-img');
  var counter = document.getElementById('lightboxCounter');
  if (img) {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    setTimeout(function() {
      img.src = lightboxImages[currentLightboxIndex];
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
      if (counter) counter.textContent = (currentLightboxIndex + 1) + ' / ' + lightboxImages.length;
    }, 200);
  }
}

function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  var img = document.getElementById('lightbox-img');
  var counter = document.getElementById('lightboxCounter');
  if (img) {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    setTimeout(function() {
      img.src = lightboxImages[currentLightboxIndex];
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
      if (counter) counter.textContent = (currentLightboxIndex + 1) + ' / ' + lightboxImages.length;
    }, 200);
  }
}

var closeBtn = document.querySelector('.lightbox-close');
if (closeBtn) {
  closeBtn.addEventListener('click', closeLightbox);
}

var lightboxPrev = document.getElementById('lightboxPrev');
if (lightboxPrev) {
  lightboxPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    prevLightboxImage();
  });
}

var lightboxNext = document.getElementById('lightboxNext');
if (lightboxNext) {
  lightboxNext.addEventListener('click', function(e) {
    e.stopPropagation();
    nextLightboxImage();
  });
}

var lightboxEl = document.getElementById('lightbox');
if (lightboxEl) {
  lightboxEl.addEventListener('click', function(e) {
    if (e.target === lightboxEl) closeLightbox();
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextLightboxImage();
  if (e.key === 'ArrowLeft') prevLightboxImage();
});

// ===== PORTFOLIO ITEM TILT =====
document.querySelectorAll('.portfolio-item').forEach(function(item) {
  item.addEventListener('mousemove', function(e) {
    var rect = item.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;
    var rotateX = (y - centerY) / 15;
    var rotateY = (centerX - x) / 15;
    item.style.transform = 'perspective(500px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
  });
  item.addEventListener('mouseleave', function() {
    item.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ===== RIPPLE EFFECT =====
document.querySelectorAll('.hero-btn, .cta-btn, .massa-card-btn, .portfolio-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    var rect = btn.getBoundingClientRect();
    var ripple = document.createElement('span');
    var size = Math.max(rect.width, rect.height);
    ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - rect.left - size / 2) + 'px;top:' + (e.clientY - rect.top - size / 2) + 'px;transform:scale(0);animation:rippleAnim 0.6s ease-out;pointer-events:none;';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 600);
  });
});

var rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }';
document.head.appendChild(rippleStyle);

// ===== ANIMAÇÃO DE ENTRADA PARA GRID =====
var gridItems = document.querySelectorAll('.portfolio-item');
var gridObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, index) {
    if (entry.isIntersecting) {
      setTimeout(function() {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, { threshold: 0.1 });

gridItems.forEach(function(item) {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
  gridObserver.observe(item);
});
