document.getElementById('regForm').addEventListener('submit', function(e) {

  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('email').value.trim();
  const phone     = document.getElementById('phone').value.trim();

  if (!firstName || !lastName || !email || !phone) {
    e.preventDefault();
    shakeEmptyFields();
    return;
  }

});

document.addEventListener('DOMContentLoaded', async function() {
  await loadCustomers();

});