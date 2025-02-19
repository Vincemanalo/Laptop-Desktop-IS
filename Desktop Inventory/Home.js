function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// Function to close the sidebar when clicking outside of it
window.onclick = function (event) {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector('.menu-icon');
    
    // Check if sidebar is open and the click was outside of sidebar or menu icon
    if (sidebar.classList.contains("open") && !sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove("open");
    }
}

// Get the 'Assets' list item (dropdown)
const assetsLink = document.querySelector('.dropdown-toggle');

// Add click event listener to toggle dropdown menu
assetsLink.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default link behavior
  
  // Find the parent 'li' element of the dropdown
  const dropdown = this.closest('li');

  // Toggle the 'active' class on the parent 'li'
  dropdown.classList.toggle('active');
});




//ASSETS JS

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.style.backgroundColor = '#2c3e50';
      });
      this.style.backgroundColor = '#1abac9';
    });
  });

  const forms = document.querySelectorAll('.new-form');
  
  function closeAllForms() {
    forms.forEach(form => {
      form.classList.remove('active');
    });
  }
  
  document.querySelector('.add-button').addEventListener('click', () => {
    closeAllForms();
    document.getElementById('add-form').classList.add('active');
  });
  
  document.querySelector('.assign-button').addEventListener('click', () => {
    closeAllForms();
    document.getElementById('assign-form').classList.add('active');
  });
  
  document.querySelector('.borrow-button').addEventListener('click', () => {
    closeAllForms();
    document.getElementById('borrow-form').classList.add('active');
  });
  
  document.querySelector('.unavailable-button').addEventListener('click', () => {
    closeAllForms();
    document.getElementById('unavailable-form').classList.add('active');
  });
  
  document.querySelector('.turnover-button').addEventListener('click', () => {
    closeAllForms();
    document.getElementById('turnover-form').classList.add('active');
  });
  
  function customDateInput(select) {
    const customDate = document.getElementById('custom-date-input');
    if (select.value === 'custom') {
      customDate.style.display = 'block';
    } else {
      customDate.style.display = 'none';
    }
  }
  
  function customDateInput(selectElement) {
    if (selectElement.value === "custom") {
        let dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = "custom-date";
        dateInput.className = "form-input";
        dateInput.onchange = function() {
            replaceDropdown(selectElement, dateInput.value);
        };

        selectElement.parentNode.replaceChild(dateInput, selectElement);
    }
}

function replaceDropdown(dateInput, selectedDate) {
    let selectDropdown = document.createElement("select");
    selectDropdown.id = "date-assigned";
    selectDropdown.className = "form-input";
    selectDropdown.onchange = function() {
        customDateInput(this);
    };

    let defaultOption = new Option("Date Assigned", "", false, true);
    defaultOption.disabled = true;
    selectDropdown.appendChild(defaultOption);

    let option1 = new Option("February 13, 2025", "2025-02-13");
    let option2 = new Option("February 14, 2025", "2025-02-14");
    let customOption = new Option(`Custom: ${selectedDate}`, selectedDate, true, true); 

    selectDropdown.appendChild(option1);
    selectDropdown.appendChild(option2);
    selectDropdown.appendChild(customOption);

    dateInput.parentNode.replaceChild(selectDropdown, dateInput);
}

function customDateInput(selectElement) {
    let customDateInput = document.getElementById("custom-date-input");
    customDateInput.style.display = selectElement.value === "custom" ? "block" : "none";
}

//POP UP 

document.addEventListener("DOMContentLoaded", function () {
  let addButton = document.querySelector(".add-button");
  if (addButton) {
      addButton.addEventListener("click", () => {
          closeAllForms();
          document.getElementById("add-form").classList.add("active");
      });
  } else {
      console.error("❌ Add button not found!");
  }
});


  let laptops = JSON.parse(localStorage.getItem("laptops")) || [];

  function renderTable() {
      laptopTableBody.innerHTML = "";
      laptops.forEach((laptop, index) => {
          let row = `<tr id="row-${index}">
              <td>${index + 1}</td>
              <td>${laptop.name}</td>
              <td>${laptop.serialNumber}</td>
              <td>${laptop.location}</td>
              <td>
                  <button onclick="editLaptop(${index})">✏ Edit</button>
                  <button onclick="deleteLaptop(${index})">🗑 Delete</button>
              </td>
          </tr>`;
          laptopTableBody.innerHTML += row;
      });
      localStorage.setItem("laptops", JSON.stringify(laptops));
  }

  renderTable();

  // Sidebar Toggle
  function toggleSidebar() {
      let sidebar = document.getElementById("sidebar");
      if (sidebar) {
          sidebar.classList.toggle("active");
      } else {
          console.error("❌ Sidebar not found");
      }
  }

  window.toggleSidebar = toggleSidebar; // Ensure it's accessible globally

  // Open Modal
  window.openModal = function () {
      let modal = document.getElementById("laptop-modal");
      if (!modal) {
          console.error("❌ Modal not found");
          return;
      }

      document.getElementById("modal-title").textContent = "Add Laptop";
      document.getElementById("submit-button").textContent = "➕ Add Laptop";  

      let laptopForm = document.getElementById("laptop-form");
      if (laptopForm) laptopForm.reset();

      modal.style.display = "flex";
  };

  // Close Modal
  window.closeModal = function () {
      let modal = document.getElementById("laptop-modal");
      if (modal) modal.style.display = "none";
  };

  // Form Submission
  document.getElementById("laptop-form").addEventListener("submit", function (e) {
      e.preventDefault();
      let name = document.getElementById("laptop-name").value.trim();
      let serialNumber = document.getElementById("serial-number").value.trim();
      let location = document.getElementById("location").value.trim();

      if (!name || !serialNumber || !location) {
          alert("❌ Please fill out all fields.");
          return;
      }

      let editIndex = document.getElementById("edit-index").value;
      if (editIndex === "") {
          laptops.push({ name, serialNumber, location });
      } else {
          laptops[editIndex] = { name, serialNumber, location };
          document.getElementById("edit-index").value = "";
      }

      document.getElementById("laptop-form").reset();
      closeModal();
      renderTable();
  });

  // Delete Laptop
  window.deleteLaptop = function (index) {
      if (confirm("Are you sure you want to delete this laptop?")) {
          laptops.splice(index, 1);
          renderTable();
      }
  };

  // Edit Laptop
  window.editLaptop = function (index) {
      let laptop = laptops[index];
      document.getElementById("laptop-name").value = laptop.name;
      document.getElementById("serial-number").value = laptop.serialNumber;
      document.getElementById("location").value = laptop.location;
      document.getElementById("edit-index").value = index;

      document.getElementById("modal-title").textContent = "Edit Laptop";
      document.getElementById("submit-button").textContent = "✏ Update Laptop";
      document.getElementById("laptop-modal").style.display = "flex";
  };

//TABLE CRUD

function toggleBoolean(cell) {
  let trueValues = ["TRUE", "Working"];
  let falseValues = ["FALSE", "Broken"];
  
  if (trueValues.includes(cell.textContent)) {
      cell.textContent = falseValues[trueValues.indexOf(cell.textContent)];
      cell.classList.add("false");
  } else if (falseValues.includes(cell.textContent)) {
      cell.textContent = trueValues[falseValues.indexOf(cell.textContent)];
      cell.classList.remove("false");
  }
}

function updateDurations() {
  let today = new Date();
  document.querySelectorAll(".calculate-duration").forEach(cell => {
      let dateText = cell.dataset.date;
      if (dateText) {
          let date = new Date(dateText);
          let diff = today - date;
          let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
          let months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
          let days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
          cell.textContent = `${years} years, ${months} months, ${days} days`;
      }
  });
}
window.onload = updateDurations;