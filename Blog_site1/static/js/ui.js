// ui.js — Ekranda ko'rsatish funksiyalari

function updateStats() {
  document.getElementById('totalCount').textContent  = customers.length;
  document.getElementById('activeCount').textContent = customers.filter(c => c.status === 'active').length;
}

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach((btn, i) => {
    btn.classList.toggle('active', i === 0 ? tab === 'form' : tab === 'list');
  });
  document.getElementById('formView').classList.toggle('active', tab === 'form');
  document.getElementById('listView').classList.toggle('active', tab === 'list');
  if (tab === 'list') loadCustomers().then(() => { updateStats(); renderTable(); });
}

function selectAvatar(el) {
  document.querySelectorAll('.avatar-opt').forEach(a => a.classList.remove('selected'));
  el.classList.add('selected');
  selectedAvatar = el.dataset.emoji;
}

function clearForm() {
  document.getElementById('regForm').reset();
  document.querySelectorAll('.avatar-opt').forEach((a, i) => a.classList.toggle('selected', i === 0));
  selectedAvatar = '👤';
  document.getElementById('emailError').style.display = 'none';
}

function shakeEmptyFields() {
  ['firstName','lastName','email','phone'].forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = 'var(--accent2)';
      el.animate([
        {transform:'translateX(-6px)'},{transform:'translateX(6px)'},
        {transform:'translateX(-4px)'},{transform:'translateX(4px)'},
        {transform:'translateX(0)'}
      ], {duration: 400});
      setTimeout(() => el.style.borderColor = '', 1500);
    }
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (msg) toast.querySelector('small').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function renderTable() {
  const filtered = getFilteredData();
  const total    = filtered.length;
  const start    = (currentPage - 1) * perPage;
  const pageData = filtered.slice(start, start + perPage);
  const tbody    = document.getElementById('tableBody');
  const empty    = document.getElementById('emptyState');

  tbody.innerHTML = '';

  if (!pageData.length) {
    empty.style.display = 'block';
    document.getElementById('pageInfo').textContent = '0 ta';
    document.getElementById('pageBtns').innerHTML   = '';
    return;
  }
  empty.style.display = 'none';

  const labels = { active:'✅ Faol', pending:'⏳ Kutilmoqda', vip:'⭐ VIP' };

  pageData.forEach((c, i) => {
    const tr = document.createElement('tr');
    tr.style.animationDelay = (i * 0.04) + 's';
    tr.innerHTML = `
      <td>
        <div class="customer-cell">
          <div class="avatar">${c.avatar}</div>
          <div class="customer-info">
            <strong>${c.firstName} ${c.lastName}</strong>
            <small>${c.createdAt || ''}</small>
          </div>
        </div>
      </td>
      <td style="color:var(--muted);font-size:.82rem">${c.email}</td>
      <td style="font-family:var(--font-mono);font-size:.82rem">${c.phone}</td>
      <td>${c.city}</td>
      <td><span class="category-tag">${c.category}</span></td>
      <td><span class="status-badge ${c.status}"><span class="status-dot"></span>${labels[c.status]}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-icon"        onclick="handleView(${c.id})">👁</button>
          <button class="btn-icon delete" onclick="handleDelete(${c.id})">🗑</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
  renderPagination(total);
}

function getFilteredData() {
  return customers
    .filter(c => currentFilter === 'all' || c.status === currentFilter)
    .filter(c => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        (c.firstName + ' ' + c.lastName).toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => (a[sortKey] || '').localeCompare(b[sortKey] || '') * sortDir);
}

function filterList() {
  searchQuery = document.getElementById('searchInput').value;
  currentPage = 1;
  renderTable();
}

function filterByStatus(status, el) {
  currentFilter = status;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  currentPage = 1;
  renderTable();
}

function sortBy(key) {
  sortDir = sortKey === key ? sortDir * -1 : 1;
  sortKey = key;
  renderTable();
}

function renderPagination(total) {
  const start = (currentPage - 1) * perPage;
  const end   = Math.min(start + perPage, total);
  const pages = Math.ceil(total / perPage);
  document.getElementById('pageInfo').textContent = `${start+1}–${end} / ${total} ta`;
  const pb = document.getElementById('pageBtns');
  pb.innerHTML = '';
  for (let p = 1; p <= pages; p++) {
    const btn = document.createElement('button');
    btn.className   = 'page-btn' + (p === currentPage ? ' active' : '');
    btn.textContent = p;
    btn.addEventListener('click', () => { currentPage = p; renderTable(); });
    pb.appendChild(btn);
  }
}

function handleView(id) {
  const c = customers.find(x => x.id === id);
  if (!c) return;
  alert(`${c.avatar} ${c.firstName} ${c.lastName}\n📧 ${c.email}\n📱 ${c.phone}\n📍 ${c.city}\n🏷 ${c.category}\n📝 ${c.notes || '—'}`);
}

async function handleDelete(id) {
  if (!confirm('O\'chirishni xohlaysizmi?')) return;
  await removeCustomer(id);
  updateStats();
  renderTable();
}
