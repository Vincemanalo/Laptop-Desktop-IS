let laptops = [{
    id: 1,
    name: 'Dell Inspiron 3501 Series',
    purchaseDate: '2021-12-20',
    serial: '7KJ2PH3',
    description: 'New Laptop Dell (Mat Black)',
    location: '1NK Center',
    assignedTo: 'Sir Benjie',
    condition: 'Working'
}];

function renderTable() {
    const table = document.getElementById('laptop-table');
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

function updateDurations() {
    document.querySelectorAll('.calculate-duration').forEach(cell => {
        const purchaseDate = new Date(cell.dataset.date);
        const diff = Date.now() - purchaseDate.getTime();
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        cell.textContent = `${years} years, ${months} months`;
    });
}

// Modal handling
const modal = document.getElementById('laptop-modal');
const openBtn = document.getElementById('open-modal');
const closeBtns = document.querySelectorAll('.close, .cancel');

openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.getElementById('laptop-form').reset();
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

// Form submission
document.getElementById('laptop-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newLaptop = {
        id: laptops.length + 1,
        name: document.getElementById('device-name').value,
        serial: document.getElementById('serial-number').value,
        purchaseDate: document.getElementById('purchase-date').value,
        description: document.getElementById('description').value,
        location: '1NK Center',
        condition: 'Working'
    };
    
    laptops.push(newLaptop);
    renderTable();
    modal.style.display = 'none';
});

// Edit and Delete functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        laptops.splice(index, 1);
        renderTable();
    }
    
    if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        const laptop = laptops[index];
        // Populate form with existing data
        document.getElementById('device-name').value = laptop.name;
        document.getElementById('serial-number').value = laptop.serial;
        document.getElementById('purchase-date').value = laptop.purchaseDate;
        document.getElementById('description').value = laptop.description;
        modal.style.display = 'block';
        
        // Update form submission to handle edit
        const form = document.getElementById('laptop-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            laptops[index] = {
                ...laptop,
                name: document.getElementById('device-name').value,
                serial: document.getElementById('serial-number').value,
                purchaseDate: document.getElementById('purchase-date').value,
                description: document.getElementById('description').value
            };
            renderTable();
            modal.style.display = 'none';
        };
    }
});

// Initial render
renderTable();