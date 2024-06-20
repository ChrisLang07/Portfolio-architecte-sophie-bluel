"use strict"

const previewGallery = document.querySelector("[rel=js-preview-gallery]");
const modalPreviewGallery = document.querySelector(".modal-preview--gallery");
const darkBackground = document.querySelector(".darkbackground");
const modal = document.querySelector(".modal");

/**
 * Create a modal window
 */

function createModal() {

    const menuModal = document.querySelector(".modal-link");
    const uploadModal = document.querySelector(".upload-modal");
    const addButton = document.querySelector(".submit-area--button");

    addButton.addEventListener("click", event => {

        uploadModal.style.display = "block";
        modalPreviewGallery.style.display = "none";
        
        const arrowBack = document.querySelector(".arrow-back");

        arrowBack.addEventListener("click", event => {
            modalPreviewGallery.style.display = "block";
            uploadModal.style.display = "none";
        });

    });


    menuModal.addEventListener("click", event => {
        displayModal();
        createCloseCross();
        closeModal();
    });

    fillPreviewGallery(works);

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
};


/**
 * Display the modal
 */
function displayModal() {
    darkBackground.style.display = "flex";
    modal.style.display = "block";
};

/**
 * Hide the modal
 */
function hideModal() {
    darkBackground.style.display = "none";
    modal.style.display = "none";
}

/**
 * Close the modal window
 */
function closeModal() {
    darkBackground.addEventListener("click", event => {
        if (event.target.matches("#cross") ||
            !event.target.closest(".modal")) {

            hideModal();
        };
    });
};


/**
 * 
 * Create the preview gallery
 * 
 * @param Object work, a work from works 
 */
function createPreviewGallery(work) {

    //Create preview pic for preview gallery
    let img = document.createElement("img");
    img.src = work.imageUrl;

    let spanTrash = document.createElement("span");
    spanTrash.classList.add("material-symbols-outlined");
    spanTrash.setAttribute("rel", "js-trash");
    spanTrash.setAttribute("id", "trash");
    spanTrash.textContent = "delete";
    spanTrash.dataset.category = work.id;

    let div = document.createElement("div");
    div.classList.add("modal-pic");
    div.dataset.category = work.id;

    div.appendChild(img);
    div.appendChild(spanTrash);

    previewGallery.appendChild(div);

    // Remove a preview pic from preview gallery
    spanTrash.addEventListener("click", event => {
        deletedWork(work.id, div);
    });

};

/**
 * 
 * To fill the preview gallery
 * 
 * @param Object work, a work from works 
 */
function fillPreviewGallery(works) {
    works.forEach(work => createPreviewGallery(work));
};

/**
 * Create an alert message for wrong and/or email/password
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


async function deletedWork(id, div) {
    const deletedWork = await httpDelete(url_deleteWork + id, store.STORE_TOKEN)
    let figure = node_gallery.querySelector('[data-category="' + id + '"]');
    if (deletedWork) {
        previewGallery.removeChild(div);
        node_gallery.removeChild(figure);
    };
};



