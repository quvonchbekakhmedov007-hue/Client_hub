document.getElementById('regForm').addEventListener('submit', function(e) {

  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('email').value.trim();
  const phone     = document.getElementById('phone').value.trim();

  // Bo'sh bo'lsa to'xtat
  if (!firstName || !lastName || !email || !phone) {
    e.preventDefault();
    shakeEmptyFields();
    return;
  }

  // Hamma narsa to'g'ri — Django ga yuboradi!

});

document.addEventListener('DOMContentLoaded', async function() {
  await loadCustomers();
  updateStats();
});