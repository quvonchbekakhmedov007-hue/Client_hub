.js — Ma'lumotlar bilan ishlash
// Hozir localStorage, baza ulash uchun faqat shu faylni o'zgartiring

async function loadCustomers() {
  // --- localStorage ---
  customers = JSON.parse(localStorage.getItem('customers') || '[]');

  // --- BAZA ULASH UCHUN yuqoridagi qatorni o'chirib quyidagini yozing ---
  // const res = await fetch('/api/customers');
  // customers = await res.json();
}

async function saveCustomer(data) {
  // --- localStorage ---
  if (customers.find(c => c.email === data.email)) {
    return { success: false, error: 'Bu email allaqachon mavjud!' };
  }
  const item = {
    id: Date.now(),
    avatar:    data.avatar    || '👤',
    firstName: data.firstName,
    lastName:  data.lastName,
    email:     data.email,
    phone:     data.phone,
    city:      data.city      || '—',
    category:  data.category  || '—',
    status:    data.status    || 'active',
    notes:     data.notes     || '',
    createdAt: new Date().toLocaleDateString('uz-UZ'),
  };
  customers.push(item);
  localStorage.setItem('customers', JSON.stringify(customers));
  return { success: true };

  // --- BAZA ULASH UCHUN yuqoridagi hammasini o'chirib quyidagini yozing ---
  // const res = await fetch('/api/customers', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return await res.json();
}

async function removeCustomer(id) {
  // --- localStorage ---
  customers = customers.filter(c => c.id !== id);
  localStorage.setItem('customers', JSON.stringify(customers));

  // --- BAZA ULASH UCHUN yuqoridagi 2 qatorni o'chirib quyidagini yozing ---
  // await fetch(`/api/customers/${id}`, { method: 'DELETE' });
  // await loadCustomers();
}