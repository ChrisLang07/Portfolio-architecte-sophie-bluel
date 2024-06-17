"use strict"

let previewGallery = document.querySelector("[rel=js-preview-gallery]");
const darkBackground = document.querySelector(".darkbackground");

/**
 * Create a modal window
 */

function createModal() {

    const menuModal = document.querySelector(".modal-link");

    let modal = document.querySelector(".modal");

    menuModal.addEventListener("click", event => {
        darkBackground.style.display = "flex";
        modal.style.display = "block";
        fillPreviewGallery(works);
        createCloseCross();
        console.log(node_gallery);

    });

};

/**
 * Create a cross on the modal window
 */
function createCloseCross() {

    const spanCross = document.createElement("span");
    spanCross.classList.add("material-symbols-outlined");
    spanCross.setAttribute("id", "cross");
    spanCross.textContent = "close";
    
    modal.appendChild(spanCross);

    // Close the modal window
    spanCross.addEventListener("click", event => {
        darkBackground.style.display = "none";
        modal.style.display = "none";
    });

};

/**
 * 
 * Create the preview gallery
 * 
 * @param Object workPreview, preview of a work 
 */
function createPreviewGallery(work) {

    let img = document.createElement("img");
    img.src = work.imageUrl;

    let spanTrash = document.createElement("span");
    spanTrash.classList.add("material-symbols-outlined");
    spanTrash.setAttribute("id", "trash");
    spanTrash.textContent = "delete";

    let div = document.createElement("div");
    div.classList.add("modal-pic");

    div.appendChild(img);
    div.appendChild(spanTrash);

    previewGallery.appendChild(div);

    console.log(work);


};

/**
 * 
 * To fill the preview gallery
 * 
 * @param Object workPreview, an preview image from works 
 */
function fillPreviewGallery(works) {
    works.forEach(work => createPreviewGallery(work));
};



/**
 * Create an alert message
 */
function modalAlertMessage() {
    const alert = document.querySelector("[rel=js-alert]");

    let span = document.createElement("span");
    span.textContent = "Wrong Email and/or Password !";

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("validation");
    button.textContent = "Ok";
    
    let div = document.createElement("div");
    div.classList.add("zone-text");


    div.appendChild(span);
    div.appendChild(button);

    alert.appendChild(div);
    alert.style.display = "block";

    button.addEventListener("click", event => {
        alert.style.display = "none";
        alert.innerHTML = "";
    })

};
