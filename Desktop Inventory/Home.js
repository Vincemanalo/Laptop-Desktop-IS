document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");

    function toggleSidebar() {
        sidebar.classList.toggle("active");
    }

    menuIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents click from closing immediately
        toggleSidebar();
    });

    // ✅ Close sidebar when clicking outside
    document.addEventListener("click", function (event) {
        if (sidebar.classList.contains("active") && !sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });
});


// ✅ Dropdown Toggle
const assetsLink = document.querySelector('.dropdown-toggle');
if (assetsLink) {
  assetsLink.addEventListener('click', function(event) {
      event.preventDefault();
      this.closest('li').classList.toggle('active');
  });
}

// ✅ Tab Button Handling
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', function () {
      document.querySelectorAll('.tab-button').forEach(btn => {
          btn.style.backgroundColor = '#2c3e50';
      });
      this.style.backgroundColor = '#1abac9';
  });
});

// ✅ Form Handling for Add, Assign, Borrow, Unavailable, Turnover
const forms = document.querySelectorAll('.new-form');

function closeAllForms() {
  forms.forEach(form => form.classList.remove('active'));
}

document.querySelectorAll('.form-toggle-button').forEach(button => {
  button.addEventListener('click', function() {
      closeAllForms();
      const formId = this.getAttribute('data-form');
      document.getElementById(formId).classList.add('active');
  });
});

// ✅ Custom Date Input Handling
function customDateInput(selectElement) {
  let customDateInput = document.getElementById("custom-date-input");
  if (customDateInput) {
      customDateInput.style.display = selectElement.value === "custom" ? "block" : "none";
  }
}

// ✅ Laptop Data Storage (Using Local Storage)
let laptops = JSON.parse(localStorage.getItem("laptops")) || [
  {
      id: 1,
      name: 'Dell Inspiron 3501 Series',
      purchaseDate: '2021-12-20',
      serial: '7KJ2PH3',
      description: 'New Laptop Dell (Mat Black)',
      location: '1NK Center',
      assignedTo: 'Sir Benjie',
      condition: 'Working'
  }
];

// ✅ Render Table
function renderTable() {
  const table = document.getElementById('laptop-table');
  if (!table) return;
  
  const tbody = table.querySelector('tbody') || table.createTBody();
  tbody.innerHTML = '';

  laptops.forEach((laptop, index) => {
      const row = tbody.insertRow();
      row.innerHTML = `
          <td>${laptop.id}</td>
          <td>${laptop.name}</td>
          <td>${new Date(laptop.purchaseDate).toLocaleDateString()}</td>
          <td class="calculate-duration" data-date="${laptop.purchaseDate}"></td>
          <td>${laptop.serial}</td>
          <td>${laptop.description}</td>
          <td>
              <select class="location-select">
                  ${['1NK Center', '2nd Office', 'Warehouse']
                      .map(opt => `<option ${opt === laptop.location ? 'selected' : ''}>${opt}</option>`)
                      .join('')}
              </select>
          </td>
          <td class="actions">
              <button class="edit-btn" data-index="${index}">Edit</button>
              <button class="delete-btn" data-index="${index}">Delete</button>
          </td>
      `;
  });

  updateDurations();
}

// ✅ Update Durations for Purchase Date
function updateDurations() {
  document.querySelectorAll('.calculate-duration').forEach(cell => {
      const purchaseDate = new Date(cell.dataset.date);
      const diff = Date.now() - purchaseDate.getTime();
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      cell.textContent = `${years} years, ${months} months`;
  });
}

// ✅ Modal Handling
const modal = document.getElementById('laptop-modal');
const openBtn = document.getElementById('open-modal');
const closeBtns = document.querySelectorAll('.close, .cancel');

if (openBtn) {
  openBtn.addEventListener('click', () => {
      modal.style.display = 'block';
      document.getElementById('laptop-form').reset();
  });
}

if (closeBtns) {
  closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          modal.style.display = 'none';
      });
  });
}

// ✅ Handle Laptop Form Submission (Add/Edit)
document.getElementById('laptop-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;

  const newLaptop = {
      id: laptops.length + 1,
      name: document.getElementById('device-name').value,
      serial: document.getElementById('serial-number').value,
      purchaseDate: document.getElementById('purchase-date').value,
      description: document.getElementById('description').value,
      location: '1NK Center',
      condition: 'Working'
  };

  let editIndex = document.getElementById('edit-index').value;
  if (editIndex !== "") {
      laptops[editIndex] = newLaptop;
      document.getElementById('edit-index').value = "";
  } else {
      laptops.push(newLaptop);
  }

  localStorage.setItem("laptops", JSON.stringify(laptops));
  renderTable();
  modal.style.display = 'none';
});

// ✅ Edit and Delete Handling
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
      const index = e.target.dataset.index;
      if (confirm("Are you sure you want to delete this laptop?")) {
          laptops.splice(index, 1);
          localStorage.setItem("laptops", JSON.stringify(laptops));
          renderTable();
      }
  }

  if (e.target.classList.contains('edit-btn')) {
      const index = e.target.dataset.index;
      const laptop = laptops[index];

      document.getElementById('device-name').value = laptop.name;
      document.getElementById('serial-number').value = laptop.serial;
      document.getElementById('purchase-date').value = laptop.purchaseDate;
      document.getElementById('description').value = laptop.description;
      document.getElementById('edit-index').value = index;
      
      modal.style.display = 'block';
  }
});

// ✅ Ensure Everything Runs on Load
window.onload = function () {
  updateDurations();
  renderTable();
};
