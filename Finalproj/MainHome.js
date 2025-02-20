document.addEventListener("click", function (e) {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");

    if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        !menuIcon.contains(e.target)
    ) {
        sidebar.classList.remove("open");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");
    const mainContent = document.getElementById("main-content"); // Optional for shifting content

    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle("open");
        }
    }

    if (menuIcon) {
        menuIcon.addEventListener("click", toggleSidebar);
    }

    // Close sidebar when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove("open");
        }
    });
});

// Modal Elements
const fillupModal = document.querySelector(".fillup-form");
const modalOverlay = document.createElement("div");
modalOverlay.classList.add("modal-overlay");
document.body.appendChild(modalOverlay);

const openBtn = document.getElementById("open-modal");
const closeBtns = document.querySelectorAll(".close-btn, .cancel");

const openModalBtn = document.getElementById("open-modal");
if (openModalBtn) {
    openModalBtn.addEventListener("click", function () {
        if (fillupModal && modalOverlay) {
            fillupModal.style.display = "block";
            modalOverlay.style.display = "block";
            laptopForm && laptopForm.reset();
        }
    });
}

// Open Modal
if (openBtn) {
    openBtn.addEventListener("click", function () {
        modal?.classList.add("active");
        overlay.classList.add("active");
    });
}

// Close Modal
closeBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        modal?.classList.remove("active");
        overlay.classList.remove("active");
    });
});

overlay.addEventListener("click", function () {
    modal?.classList.remove("active");
    overlay.classList.remove("active");
});

// Laptop Table Management
let laptops = [
    {
        id: 1,
        name: "Dell Inspiron 3501 Series",
        purchaseDate: "2021-12-20",
        serial: "7KJ2PH3",
        description: "New Laptop Dell (Mat Black)",
        location: "1NK Center",
        assignedTo: "Sir Benjie",
        condition: "Working"
    }
];

function renderTable}

function updateDurations() {
    document.querySelectorAll(".calculate-duration").forEach(cell => {
        const purchaseDate = new Date(cell.dataset.date);
        if (isNaN(purchaseDate)) {
            cell.textContent = "N/A";
            return;
        }

        const diff = Date.now() - purchaseDate.getTime();
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor(
            (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
        );
        cell.textContent = `${years} years, ${months} months`;
    });
}

function toggleBoolean(cell) {
    let text = cell.textContent.trim().toUpperCase();
    if (text === "FALSE") {
      cell.textContent = "TRUE";
    } else if (text === "TRUE") {
      cell.textContent = "FALSE";
    } else if (text === "WORKING") {
      cell.textContent = "NOT WORKING";
    } else if (text === "NOT WORKING") {
      cell.textContent = "Working";
    }
  }
  

// Form Submission
const laptopForm = document.getElementById("laptop-form");
if (laptopForm) {
    laptopForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newLaptop = {
            id: laptops.length + 1,
            name: document.getElementById("device-name").value,
            serial: document.getElementById("serial-number").value,
            purchaseDate: document.getElementById("purchase-date").value,
            description: document.getElementById("description").value,
            location: "1NK Center",
            condition: "Working"
        };

        laptops.push(newLaptop);
        renderTable();
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
}

// Edit and Delete functionality
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;
        laptops.splice(index, 1);
        renderTable();
    }

    if (e.target.classList.contains("edit-btn")) {
        const index = e.target.dataset.index;
        const laptop = laptops[index];

        document.getElementById("device-name").value = laptop.name;
        document.getElementById("serial-number").value = laptop.serial;
        document.getElementById("purchase-date").value = laptop.purchaseDate;
        document.getElementById("description").value = laptop.description;
        modal.classList.add("active");
        overlay.classList.add("active");

        laptopForm.onsubmit = function (e) {
            e.preventDefault();
            laptops[index] = {
                ...laptop,
                name: document.getElementById("device-name").value,
                serial: document.getElementById("serial-number").value,
                purchaseDate: document.getElementById("purchase-date").value,
                description: document.getElementById("description").value
            };
            renderTable();
            modal.classList.remove("active");
            overlay.classList.remove("active");
        };
    }
});

const svgIcon = document.querySelector(".box-content svg");
const infoModal = document.querySelector(".info-page");
const infoOverlay = document.querySelector(".info-overlay");

if (svgIcon && infoModal && infoOverlay) {
    svgIcon.addEventListener("click", function () {
        infoModal.classList.toggle("active");
        infoOverlay.classList.toggle("active");
    });

    infoOverlay.addEventListener("click", function () {
        infoModal.classList.remove("active");
        infoOverlay.classList.remove("active");
    });
}

function closeModal() {
    modal?.classList.remove("active");
    overlay.classList.remove("active");
    infoModal?.classList.remove("active");
    infoOverlay?.classList.remove("active");
}

function updateDurations() {
    const rows = document.querySelectorAll("#laptop-table tbody tr");
    rows.forEach(row => {
      const purchaseDateCell = row.querySelector("td[data-date]");
      const durationCell = row.querySelector(".calculate-duration");
  
      if (purchaseDateCell && durationCell) {
        const purchaseDateStr = purchaseDateCell.getAttribute("data-date");
        const purchaseDate = new Date(purchaseDateStr);
        const now = new Date();
  
        let years = now.getFullYear() - purchaseDate.getFullYear();
        let months = now.getMonth() - purchaseDate.getMonth();
        
        if (months < 0) {
          years--;
          months += 12;
        }
  
        durationCell.textContent = `${years} years, ${months} months`;
      }
    });
  }
  
  updateDurations();

renderTable();
});
