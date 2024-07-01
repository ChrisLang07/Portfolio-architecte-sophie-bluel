"use strict"

const darkBackground = document.querySelector('.darkbackground')
const modal = document.querySelector('.modal');


/**
 * Display the modal
 */
function displayModal() {
    const displayModal = document.querySelector('.modal-link');
    const modalPreviewGalleryllery = document.querySelector('.modal-preview-gallery');
    const uploadFileModal = document.querySelector('.upload-file-modal');

    displayModal.addEventListener('click', event => {

        darkBackground.style.display = 'flex';
        modal.style.display = 'block';
        modalPreviewGalleryllery.style.display = 'block';
        modalPreviewGalleryllery.innerHTML = '';
        uploadFileModal.style.display = 'none';
        uploadFileModal.innerHTML = '';

        createCloseCross()
        getWorks()
    })
};

async function getWorks() {
    const getWorks = await httpGet(url_works);
    createPreviewGallery(getWorks);
    fillGallery(getWorks);
}

/**
 * 
 * Close the modal window
 * 
 */
function closeModal() {

    darkBackground.addEventListener("click", event => {

        if (event.target.matches("#cross") ||
            !event.target.closest(".modal")) {


            modal.style.display = "none";
            darkBackground.style.display = "none";

        };

    });
};

/**
 * Create a cross for closing the modal
 */
function createCloseCross() {

    const spanCross = document.createElement("span");
    spanCross.classList.add("material-symbols-outlined");
    spanCross.setAttribute("id", "cross");
    spanCross.textContent = "close";

    modal.appendChild(spanCross);

    closeModal();
};




/**
 * Create a preview gallery of works
 */
function createPreviewGallery(works) {

    const modal = document.querySelector('.modal');

    let span = document.createElement('span');
    span.classList.add("gallery-title");
    span.textContent = "Galerie photo";

    let divPreviewGallery = document.createElement('div');
    divPreviewGallery.classList.add('preview-gallery');
    divPreviewGallery.setAttribute('rel', 'js-preview-gallery');

    let button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.classList.add('submit-button');
    button.textContent = 'Ajouter une photo';


    let divModalPreviewGallery = document.querySelector('.modal-preview-gallery');

    divModalPreviewGallery.appendChild(span);
    divModalPreviewGallery.appendChild(divPreviewGallery);
    divModalPreviewGallery.appendChild(button);

    fillPreviewGallery(works);

    button.addEventListener('click', event => {

        displayUploadModal();


    });
};

/**
 * Create an image preview of a work
 * 
 * @param Object work, a work from works 
 */
function previewImg(work) {
    const previewGalleryImg = document.querySelector('.preview-gallery');

    let img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;

    let spanTrash = document.createElement("span");
    spanTrash.classList.add("material-symbols-outlined");
    spanTrash.setAttribute("rel", "js-trash");
    spanTrash.setAttribute("id", "trash");
    spanTrash.textContent = "delete";
    spanTrash.dataset.category = work.id;

    let divPreviewImg = document.createElement('div');
    divPreviewImg.classList.add('preview-img');
    divPreviewImg.dataset.category = work.id;

    divPreviewImg.appendChild(img);
    divPreviewImg.appendChild(spanTrash);

    previewGalleryImg.appendChild(divPreviewImg);

    // Delete a work from gallery/Preview Gallery
    spanTrash.addEventListener("click", event => {
        deletedWork(work.id);

    });
};

/**
 * Delete a work from works and update gallery/Preview Gallery
 */
async function deletedWork(id) {

    const deletedWork = await httpDelete(url_deleteWork + id, store.STORE_TOKEN);
    const previewGallery = document.querySelector('.preview-gallery');

    let figure = node_gallery.querySelector('[data-category="' + id + '"]');
    let divTodelete = previewGallery.querySelector('[data-category="' + id + '"]');
    if (deletedWork) {

        node_gallery.removeChild(figure);
        previewGallery.removeChild(divTodelete);
    };
};

/**
 * 
 * Filled the preview gallery with an image of each work
 * 
 * @param Object works 
 */
function fillPreviewGallery(works) {

    works.forEach(work => previewImg(work));
};

function uploadFileModal() {

    let div = document.querySelector('.upload-file-modal');


    let spanArrow = document.createElement('span');
    spanArrow.classList.add('material-symbols-outlined');
    spanArrow.classList.add('arrow-back')
    spanArrow.textContent = 'arrow_back';

    let spanTitle = document.createElement('span');
    spanTitle.classList.add('gallery-title');
    spanTitle.textContent = 'Ajouter photo';


    div.appendChild(spanArrow);
    div.appendChild(spanTitle);


    modal.appendChild(div);

    backToModalPreviewGallery();
}


/**
 * Create the upload zone for an image of a work
 */
function uploadFileContent() {

    let div = document.querySelector('.upload-file-modal');

    let spanIcon = document.createElement('span');
    spanIcon.classList.add('material-symbols-outlined');
    spanIcon.classList.add('images-mode');
    spanIcon.textContent = 'imagesmode';

    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.classList.add("input-file");

    let spanAdd = document.createElement('span');
    spanAdd.textContent = "+ Ajouter photo";

    let FileUpload = document.createElement('div');
    FileUpload.classList.add('file-upload');

    let spanExtensionSize = document.createElement('span');
    spanExtensionSize.classList.add('pic-extension-size');
    spanExtensionSize.textContent = "jpg, png : 4mo max";

    let divUpload = document.createElement('div');
    divUpload.classList.add('image-upload');

    FileUpload.appendChild(input);
    FileUpload.appendChild(spanAdd);

    divUpload.appendChild(spanIcon);
    divUpload.appendChild(FileUpload);
    divUpload.appendChild(spanExtensionSize);

    let option = document.createElement('option');
    option.value = '';
    option.textContent = '';

    let optionObject = document.createElement('option');
    optionObject.value = 'Objets';
    optionObject.textContent = 'Objets'

    let optionAppartments = document.createElement('option');
    optionAppartments.value = 'Appartements';
    optionAppartments.textContent = 'Appartements';

    let optionHotel = document.createElement('option');
    optionHotel.value = 'Hôtel & restaurants';
    optionHotel.textContent = 'Hôtel & restaurants';

    let select = document.createElement('select');
    select.classList.add('image-category');
    select.setAttribute('name', 'category');

    select.appendChild(option);
    select.appendChild(optionObject);
    select.appendChild(optionAppartments);
    select.appendChild(optionHotel);

    let labelCategory = document.createElement('label');
    labelCategory.setAttribute('for', 'name');
    labelCategory.textContent = 'Catégorie';

    let divImagePropertyCategory = document.createElement('div');
    divImagePropertyCategory.classList.add('image-property--category');

    divImagePropertyCategory.appendChild(labelCategory);
    divImagePropertyCategory.appendChild(select);


    let inputImageTitle = document.createElement('input');
    inputImageTitle.classList.add('image-title');
    inputImageTitle.setAttribute('type', 'text');
    inputImageTitle.setAttribute('name', 'title');

    let labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'name');
    labelTitle.textContent = 'Titre';


    let divImagePropertyTitle = document.createElement('div');
    divImagePropertyTitle.classList.add('image-property--title');

    divImagePropertyTitle.appendChild(labelTitle);
    divImagePropertyTitle.appendChild(inputImageTitle);


    let divPicSpecs = document.createElement('div');
    divPicSpecs.classList.add('pic-specs');

    divPicSpecs.appendChild(divImagePropertyTitle);
    divPicSpecs.appendChild(divImagePropertyCategory);

    let form = document.createElement('form');
    form.classList.add('submit-form');

    form.appendChild(divPicSpecs);

    let button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.classList.add('submit-image-button');
    button.textContent = "Valider";


    div.appendChild(divUpload);
    div.appendChild(form);
    div.appendChild(button);
};

function backToModalPreviewGallery() {
    const arrowBack = document.querySelector('.arrow-back');
    const modalPreviewGallery = document.querySelector('.modal-preview-gallery');
    const fileModal = document.querySelector('.upload-file-modal');


    arrowBack.addEventListener('click', event => {


        modalPreviewGallery.style.display = "block";
        modalPreviewGallery.innerHTML = '';
        getWorks();
        fileModal.style.display = 'none';



    })
}

function displayUploadModal() {
    const modal = document.querySelector('.modal');
    const modalPreviewGallery = document.querySelector('.modal-preview-gallery');
    const fileModal = document.querySelector('.upload-file-modal');

    modalPreviewGallery.style.display = "none";
    fileModal.style.display = 'block';
    fileModal.innerHTML = "";

    uploadFileModal();
    uploadFileContent();
    displayImagePreview();
    getWorks();


}

/**
 * Display the image preview
 */
function displayImagePreview() {
    const uploadZone = document.querySelector(".image-upload");
    const inputFile = document.querySelector(".input-file");
    const inputTitle = document.querySelector(".image-title");
    const inputCategory = document.querySelector(".image-category");
    const submitButton = document.querySelector(".submit-image-button");
    const fileUpload = document.querySelector('.file-upload');

    inputFile.addEventListener('change', event => {

        let nodeImage = event.target.files;

        if (nodeImage.length > 0 &&
            nodeImage[0].type === 'image/png' ||
            nodeImage[0].type === 'image/jpeg' &&
            nodeImage[0].size <= '32000000') {

            fileUpload.classList.add('active');
            let img = document.createElement("img");
            img.src = URL.createObjectURL(nodeImage[0]);
            img.classList.add("upload-img");

            uploadZone.appendChild(img);

            // Add a title to an image of a work
            inputTitle.addEventListener('input', event => {
                let nodeTitle = event.target

                if (nodeTitle.textLength > 0) {
                    img.alt = nodeTitle.value;

                } else {

                    alert('Veuillez entrer un nom valide...');
                }
            });

            //Add a category to an image of a work
            inputCategory.addEventListener('change', event => {

                let nodeCategory = event.target;

                if (nodeCategory.value != '') {
                    img.dataset.category = nodeCategory.selectedIndex;

                } else {

                    alert('Veuillez choisir une catégorie...');

                }
            });

            // Setup the submit button for uploading a work
            modal.addEventListener('change', event => {
                if (inputFile.value != "" &&
                    inputTitle.textLength > 0 &&
                    inputCategory.value != "") {
                    submitButton.classList.add("active-button");
                    submitButton.addEventListener('click', event => {

                        uploadNewWork(nodeImage);
                    });

                } else {
                    submitButton.classList.remove("active-button");
                };
            });
        };
    });
};


/**
 * 
 * Create a form Data of a work and make an HTTP POST request for uploadind a work
 * 
 * @param image, an image you need to upload 
 */
async function uploadNewWork(image) {
    const fileModal = document.querySelector(".upload-file-modal");
    const uploadImg = document.querySelector('.upload-img');

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', uploadImg.alt);
    formData.append('category', uploadImg.dataset.category);


    const uploadNewWork = await httpPostImage(url_works, store.STORE_TOKEN, formData);
    if (uploadNewWork) {

        alert('Envoyé !')

        fileModal.innerHTML = "";
        uploadFileModal();
        uploadFileContent();
        getWorks();
        displayImagePreview();

    } else {

        alert('Une erreur s\'est produite...');

        fileModal.innerHTML = "";
        uploadFileModal();
        uploadFileContent();
        displayImagePreview();

    };
};

function message() {
    const imageUpload = document.querySelector('.image-upload');

    let span = document.createElement('span');
    span.textContent = 'Taille ou format invalide !';

    let button = document.createElement("button");
    button.setAttribute('type', 'button');
    button.classList.add('validation');
    button.textContent = 'Ok';

    let div = document.createElement('div');
    div.classList.add('truc');


    div.appendChild(span);
    div.appendChild(button);

    imageUpload.appendChild(div);
    imageUpload.style.display = 'block';

    button.addEventListener('click', event => {
        imageUpload.style.display = 'none';
        imageUpload.innerHTML = '';
    });
};