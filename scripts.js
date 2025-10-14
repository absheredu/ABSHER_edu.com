// واجهة تفاعلية بسيطة للموقع
document.addEventListener('DOMContentLoaded', function () {
  // سنة الفوتر
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // قائمة التنقل للهواتف
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('show');
    });
  }

  // تصفية الخدمات
  const filter = document.getElementById('categoryFilter');
  const servicesGrid = document.getElementById('servicesGrid');
  if (filter && servicesGrid) {
    filter.addEventListener('change', function () {
      const val = this.value;
      const cards = servicesGrid.querySelectorAll('.service-card');
      cards.forEach(card => {
        if (val === 'all' || card.dataset.category === val) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // مودال طلب الخدمة
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalContactBtn = document.getElementById('modalContactBtn');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.service-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const service = btn.getAttribute('data-service') || btn.textContent.trim();
      modalTitle.textContent = `طلب استشارة: ${service}`;
      modalDesc.textContent = `شكرًا لاهتمامك بخدمة "${service}". سنرشدك ونوفر خطة عمل واضحة لتقديم الدعم الأكاديمي أو المهني بشكل قانوني وأخلاقي.`;
      // رابط واتساب الافتراضي — حرره لرقمك
      const waNumber = "966568574846"; // ضع رقمك بدون + أو علامات
      const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('مرحبًا، أرغب بمزيد من التفاصيل عن: ' + service)}`;
      modalContactBtn.setAttribute('href', waLink);
      openModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  function openModal(){ if (modal) modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ if (modal) modal.setAttribute('aria-hidden','true'); }

  // معالجة نموذج التواصل محليًا (تُرسل لواتساب أو تُرسل إلى السيرفر لاحقًا)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.name.value.trim() || 'زائر';
      const service = form.service ? form.service.value.trim() : '';
      const message = form.message.value.trim();
      // مثال: بناء رابط واتساب مع نص مسبق لسهولة التواصل
      const waText = `مرحبًا، ${name} يرغب بالمزيد عن: ${service}\n\nالرسالة:\n${message}`;
      const waNumber = "966568574846"; // استبدل برقمك
      const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
      status.innerHTML = `جارٍ تحويلك إلى واتساب... <a href="${waLink}" target="_blank" rel="noopener">فتح WhatsApp</a>`;
      form.reset();
      setTimeout(()=> status.textContent = '', 8000);
    });
  }
});