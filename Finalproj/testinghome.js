document.addEventListener("DOMContentLoaded", function () {
    // Sidebar toggle
    function toggleSidebar() {
        let sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.classList.toggle("open");
        }
    }
    
    document.querySelector(".menu-icon")?.addEventListener("click", toggleSidebar);

    // Modal Elements
    const modal = document.querySelector(".fillup-form");
    const overlay = document.createElement("div");
    overlay.classList.add("info-overlay");
    document.body.appendChild(overlay);

    const openBtn = document.getElementById("open-modal");
    const closeBtns = document.querySelectorAll(".close-btn, .cancel");

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

    function renderTable() {
        const table = document.getElementById("laptop-table");
        if (!table) return;

        const tbody = table.querySelector("tbody") || table.createTBody();
        tbody.innerHTML = "";

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
                        ${["1NK Center", "2nd Office", "Warehouse"]
                            .map(
                                opt =>
                                    `<option ${
                                        opt === laptop.location ? "selected" : ""
                                    }>${opt}</option>`
                            )
                            .join("")}
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

            // Populate form with existing data
            document.getElementById("device-name").value = laptop.name;
            document.getElementById("serial-number").value = laptop.serial;
            document.getElementById("purchase-date").value = laptop.purchaseDate;
            document.getElementById("description").value = laptop.description;
            modal.classList.add("active");
            overlay.classList.add("active");

            // Update form submission to handle edit
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

    // Ensure popup works correctly
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

    // Initial render
    renderTable();
});
