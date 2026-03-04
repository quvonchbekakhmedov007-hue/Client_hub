// Hozir localStorage, baza ulash uchun faqat shu faylni o'zgartiring

async function loadCustomers() {
  customers = JSON.parse(localStorage.getItem('customers') || '[]');
}

async function saveCustomer(data) {
  if (customers.find(c => c.email === data.email)) {
    return { success: false, error: 'Bu email allaqachon mavjud!' };
  }
  const item = {
    id:        Date.now(),
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
}

async function removeCustomer(id) {
  customers = customers.filter(c => c.id !== id);
  localStorage.setItem('customers', JSON.stringify(customers));
}