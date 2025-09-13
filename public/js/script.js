
const overlayBtn = document.querySelector("#overlay-btn");
const popupModal = document.querySelector("#popup-modal");
const closeBtn = document.querySelector("#close-btn");
const overlayModal = document.querySelector("#overlay-modal");
const modalBox = document.querySelector("#modal-box");
const checkoutBtn = document.querySelector("#checkout-btn");
const backtoTopBtn = document.querySelector("#back-to-top-btn");

backtoTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
})

overlayBtn.addEventListener("click", (e) => {  
    popupModal.classList.add("active");
   
});

overlayModal.addEventListener("click",(e) =>{
    if (e.target == overlayModal) {
        popupModal.classList.remove("active");
    }
});

closeBtn.addEventListener("click",() =>{
    popupModal.classList.remove("active")
});



flatpickr("#postDate", {
    dateFormat: "Y-m-d",
    defaultDate: "today",
    maxDate: "today"
});
