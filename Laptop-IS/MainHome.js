document.addEventListener("DOMContentLoaded", function () {
    // Select modal elements
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const cancelModalBtn = document.getElementById("cancel-modal");
    const modalOverlay = document.querySelector(".popup-form");
    const fillupModal = document.querySelector(".fillup-form");
    const laptopForm = document.getElementById("laptop-form");

    // Open modal on button click
    if (openModalBtn) {
      openModalBtn.addEventListener("click", function () {
        fillupModal.style.display = "block";
        modalOverlay.style.display = "block";
        if (laptopForm) laptopForm.reset();
      });
    }

    // Close modal on close button click
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", function () {
        fillupModal.style.display = "none";
        modalOverlay.style.display = "none";
      });
    }

        // Close modal on close button click
        if (cancelModalBtn) {
            cancelModalBtn.addEventListener("click", function () {
              fillupModal.style.display = "none";
              modalOverlay.style.display = "none";
            });
          }

    // Close modal on overlay click
    if (modalOverlay) {
      modalOverlay.addEventListener("click", function () {
        fillupModal.style.display = "none";
        modalOverlay.style.display = "none";
      });
    }
  });

  //Edit and Delete of the Table

  function editRow(button) {
    let row = button.parentElement.parentElement;
    alert("Editing row: " + row.cells[0].innerText);
}

function deleteRow(button) {
    let row = button.parentElement.parentElement;
    let confirmDelete = confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
        row.remove();
    }
}

