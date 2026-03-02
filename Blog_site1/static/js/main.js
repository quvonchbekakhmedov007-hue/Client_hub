// main.js — Forma submit va sahifa yuklanishi

document.getElementById('regForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('email').value.trim();
  const phone     = document.getElementById('phone').value.trim();

  if (!firstName || !lastName || !email || !phone) {
    shakeEmptyFields();
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.classList.add('loading');
  btn.textContent = '⏳ Saqlanmoqda...';

  const result = await saveCustomer({
    avatar:    selectedAvatar,
    firstName, lastName, email, phone,
    city:     document.getElementById('city').value     || '—',
    category: document.getElementById('category').value || '—',
    status:   document.getElementById('status').value,
    notes:    document.getElementById('notes').value,
  });

  btn.classList.remove('loading');
  btn.textContent = '✦ Ro\'yxatdan O\'tkazish';

  if (result.success) {
    clearForm();
    showToast('Mijoz muvaffaqiyatli saqlandi');
    updateStats();
  } else {
    const err = document.getElementById('emailError');
    err.textContent  = '❌ ' + result.error;
    err.style.display = 'block';
  }
});

document.addEventListener('DOMContentLoaded', async function() {
  await loadCustomers();
  updateStats();
});