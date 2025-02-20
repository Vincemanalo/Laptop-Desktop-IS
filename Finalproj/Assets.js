document.addEventListener("DOMContentLoaded", function () {
    // Select modal elements
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const modalOverlay = document.querySelector(".modal-overlay");
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

    // Close modal on overlay click
    if (modalOverlay) {
      modalOverlay.addEventListener("click", function () {
        fillupModal.style.display = "none";
        modalOverlay.style.display = "none";
      });
    }
  });
