// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
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

// Add click event listeners to tab buttons
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.style.backgroundColor = '#2c3e50';
      });
      // Add active class to clicked button
      this.style.backgroundColor = '#1abac9';
    });
  });

  const forms = document.querySelectorAll('.new-form');
  
  function closeAllForms() {
    forms.forEach(form => {
      form.classList.remove('active'); // Hide all forms
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
        // Create an input field for the custom date
        let dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = "custom-date";
        dateInput.className = "form-input";
        dateInput.onchange = function() {
            replaceDropdown(selectElement, dateInput.value);
        };

        // Replace the select dropdown with the date input
        selectElement.parentNode.replaceChild(dateInput, selectElement);
    }
}

function replaceDropdown(dateInput, selectedDate) {
    // Restore the dropdown
    let selectDropdown = document.createElement("select");
    selectDropdown.id = "date-assigned";
    selectDropdown.className = "form-input";
    selectDropdown.onchange = function() {
        customDateInput(this);
    };

    // Default option
    let defaultOption = new Option("Date Assigned", "", false, true);
    defaultOption.disabled = true;
    selectDropdown.appendChild(defaultOption);

    // Preset options
    let option1 = new Option("February 13, 2025", "2025-02-13");
    let option2 = new Option("February 14, 2025", "2025-02-14");
    let customOption = new Option(`Custom: ${selectedDate}`, selectedDate, true, true); 

    selectDropdown.appendChild(option1);
    selectDropdown.appendChild(option2);
    selectDropdown.appendChild(customOption);

    // Replace the date input field with the dropdown
    dateInput.parentNode.replaceChild(selectDropdown, dateInput);
}

function customDateInput(selectElement) {
    let customDateInput = document.getElementById("custom-date-input");
    customDateInput.style.display = selectElement.value === "custom" ? "block" : "none";
}
