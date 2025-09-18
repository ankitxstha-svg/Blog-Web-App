
const overlayBtn = document.querySelector("#overlay-btn");
const popupModal = document.querySelector("#popup-modal");
const closeBtn = document.querySelector("#close-btn");
const overlayModal = document.querySelector("#overlay-modal");
const modalBox = document.querySelector("#modal-box");
const checkoutBtn = document.querySelector("#checkout-btn");
const backtoTopBtn = document.querySelector("#back-to-top-btn");
const editPostBtn = document.querySelector("#edit-post-btn");
const editpostPopupModal = document.querySelector("#editpost-popup-modal");
const editpostOverlayModal= document.querySelector("#editpost-overlay-modal");
const editpostCloseBtn = document.querySelector("#edit-post-close-btn");
const changeImageRadios = document.querySelectorAll("input[name='changeImage']");
const changeBlogimageContainer = document.getElementById("changeBlogimage-container");
const delPostBtn = document.getElementById("del-post-btn");

if(backtoTopBtn){
backtoTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
});}

if(editPostBtn){
    editPostBtn.addEventListener("click", (e) => {
        editpostPopupModal.classList.add("active");

        const button = e.currentTarget;
        
        const firstName = button.getAttribute('data-firstName');
        const lastName = button.getAttribute('data-lastName')
        const email = button.getAttribute('data-email')
        const content = button.getAttribute('data-content')
        const image = button.getAttribute('data-image')

        document.getElementById('firstName').value = firstName;
        document.getElementById('lastName').value = lastName;
        document.getElementById('email').value = email;
        document.getElementById('content').value = content;
        document.getElementById('editpost-image-preview').src = `/uploads/${image}`;


    })
}

if(delPostBtn){
    delPostBtn.addEventListener("click", async() => {
        const postId = delPostBtn.dataset.id;

        if(!confirm("Are you Sure want to del the post?"))return;

        try{
            const response = await fetch(`/delete-post/${postId}`, {
                method: "POST",
            });

            if(response.ok){
                console.log("post deleted successfully");

                alert("✅ Post deleted successfully!");
                window.location.href = "/";
            }else{
                console.error("failed to delete post");
            }
        
        }catch (error){
            console.error("error deleteing post", error);
        }
    });
}

if(editpostOverlayModal){
    editpostOverlayModal.addEventListener("click",(e) =>{
        if (e.target == editpostOverlayModal) {
            editpostPopupModal.classList.remove("active");
        }
    });}
    
if(editpostCloseBtn){
    editpostCloseBtn.addEventListener("click",() =>{
        editpostPopupModal.classList.remove("active")
});}




if(overlayBtn){
overlayBtn.addEventListener("click", (e) => {  
    popupModal.classList.add("active");
   
});}

if(overlayModal){
overlayModal.addEventListener("click",(e) =>{
    if (e.target == overlayModal) {
        popupModal.classList.remove("active");
    }
});}

if(closeBtn){
closeBtn.addEventListener("click",() =>{
    popupModal.classList.remove("active")
});}

if(changeImageRadios){
    changeImageRadios.forEach(radio => {
        radio.addEventListener("change", ()=>{
            if(radio.value === 'yes' && radio.checked){
                changeBlogimageContainer.style.display = 'block';
            }else if(radio.value === 'no' && radio.checked){
                changeBlogimageContainer.style.display = 'none';
            }
        })
    })
}



flatpickr("#postDate", {
    dateFormat: "Y-m-d",
    defaultDate: "today",
    maxDate: "today"
});
