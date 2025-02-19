// Function to toggle the sidebar
function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
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

