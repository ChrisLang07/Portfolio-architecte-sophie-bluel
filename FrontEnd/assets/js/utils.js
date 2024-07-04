"use strict"

const url_works = "http://localhost:5678/api/works";
const url_categories = "http://localhost:5678/api/categories";
const url_deleteWork = "http://localhost:5678/api/works/";

/**
 * Make a HTTP GET Request and return an array
 * 
 * @param String url 
 * @returns Array
 */
async function httpGet(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch (error) {
        alert('HTTP Error ! :' + error);
        return [];
    };
};

/**
 * Make a HTTP POST Request and return an array
 * 
 * @param String url 
 * @param Object data, Data you need to pass the request
 * @param Object headers, The HTTP request headers options
 */
async function httpPostJson(url, data, headers) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        });
        return await response.json();
    }
    catch (error) {
        alert('HTTP Error ! :' + error);
        return [];
    };
};

/**
 * 
 * Make a HTTP DELETE Request
 * 
 * @param String url 
 * @param Object headers, the HTTP request headers options 
 * 
 */
async function httpDelete(url, token) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        return response.ok;

    }
    catch (error) {
        alert("HTTP Error : " + error)
        return [];
    };
};

/**
 * 
 * Make a HTTP POST Request
 * 
 * @param  String url 
 * @param Object headers, the HTTP request headers options
 * @param  formData, data you need to pass the request
 * @returns 
 */
async function httpPostImage(url, token, formData) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: formData
        });

        return response.ok;
    }
    catch(error) {
        alert("HTTP Error : " + error)
        return [];
    };
};

/**
 * 
 * Create a modal
 * 
 * @param Object header 
 * @param Object content 
 * @param Object footer 
 */
function createModal(header=null, content=null, footer=null) {

    let body = document.querySelector('body');

    let modalCloseBtn = document.createElement('button');
        modalCloseBtn.setAttribute('type', 'button');
        modalCloseBtn.classList.add('close-btn');
        modalCloseBtn.textContent = 'X'

    
    let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-title');
        modalHeader.append(header);


   
    let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.append(content);
        
          
       
    let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        modalFooter.append(footer);
    

    let container = document.createElement('div');
        container.classList.add('modal');
        container.append(modalCloseBtn);

    if (header) {
       container.append(modalHeader); 
    }
        
    if (content) {
        container.append(modalContent);
    };

    if (footer) {
        container.append(modalFooter);
    }

    let modal = document.createElement('div');
        modal.classList.add('modal-backdrop');

    body.append(modal);
    body.append(container);

    closeModal();

};

/**
 * Create the modal with a preview of each work
 */
function modalPreviewContent() {
    
    const header = document.createElement('h2');
    header.textContent = 'Gallery Photo';
    
    const content = fillPreviewGallery(works);
    
    
    const footer = document.createElement('button');
    footer.classList.add('add-btn');
    footer.textContent = 'Ajouter photo';
    footer.addEventListener('click', event => {
        event.preventDefault();
        displayUploadModal();
    })
    
    createModal(header, content, footer);
    
    
}

/**
 * 
 * Fill the preview gallery with work
 * 
 * @param Object work, a work from works 
 */
function previewGallery(work) {

        
    let spanTrash = document.createElement("span");
        spanTrash.classList.add("material-symbols-outlined");
        spanTrash.setAttribute("rel", "js-trash");
        spanTrash.setAttribute("id", "trash");    
        spanTrash.textContent = "delete";    
        spanTrash.dataset.category = work.id;            
            
    let img = document.createElement('img');
        img.classList.add('preview-img');
        img.src = work.imageUrl;
        img.alt = work.title;
        img.dataset.category = work.id;

    let figure = document.createElement('figure');
        figure.classList.add('preview');
        figure.dataset.category = work.id;

        figure.append(spanTrash);
        figure.append(img);
        
        spanTrash.addEventListener("click", event => {
            
            deletedWork(work.id);
        });
        
        return figure;
        
};

function fillPreviewGallery(works) {
    const figureContent = document.createElement('div');

    works.forEach((work)=> {
        let preview = previewGallery(work);
        figureContent.classList.add('content');
        figureContent.append(preview);
    });
    
    return figureContent;
};

/**
 * 
 * Close the modal window
 * 
 */
function closeModal() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body')
    const closeBtn = document.querySelector('.close-btn')
;
    modalBackdrop.addEventListener('click', event => {
        event.stopImmediatePropagation();

       body.removeChild(modalBackdrop);
       body.removeChild(modal)

    });

    closeBtn.addEventListener('click', event => {
        event.stopImmediatePropagation();

        body.removeChild(modalBackdrop);
        body.removeChild(modal)
    })
};

/**
 * Delete a work from works and update gallery/Preview Gallery
 */
async function deletedWork(id) {

    const deletedWork = await httpDelete(url_deleteWork + id, store.STORE_TOKEN);
    const preview = document.querySelector('.preview');
    const modalContent = document.querySelector('.modal-content');

    let figure = node_gallery.querySelector('[data-category="' + id + '"]');
    let previewToDel = modalContent.querySelector('[data-category="' + id + '"]');
    
    if (deletedWork) {

        node_gallery.removeChild(figure);
        modalContent.removeChild(previewToDel);
        
    };
};

/**
 * Create the modal with a preview of each work
 */
function modalPreviewUpload() {
    
    const header = document.createElement('h2');
    header.textContent = 'Ajout Photo';
    
    const content = document.createElement('div');
    content.classList.add('content');
    const form = formUpload();
    content.append(form);
    
    const footer = document.createElement('button');
    footer.classList.add('valid-btn');
    footer.classList.add('no-active');
    footer.textContent = 'Valider';

    createModal(header, content, footer);
    
}

function arrowBack() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body')

    const arrowBack = document.createElement('span');
    arrowBack.classList.add('material-symbols-outlined');
    arrowBack.classList.add('arrow-back');
    arrowBack.textContent = 'arrow_back';

    modal.append(arrowBack);
    const Arrow = document.querySelector('.arrow-back');
    arrowBack.addEventListener('click', event => {
        
        body.removeChild(modalBackdrop);
        body.removeChild(modal)

        modalPreviewContent();
    })


};



function formUpload() {
    
    
    let form = document.createElement('form');

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

    let divImagePropertyCategory = document.createElement('div');
    divImagePropertyCategory.classList.add('image-property--category');

    let labelCategory = document.createElement('label');
    labelCategory.setAttribute('for', 'name');
    labelCategory.textContent = 'Catégorie';

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

    divImagePropertyCategory.appendChild(labelCategory);
    divImagePropertyCategory.appendChild(select);

    divPicSpecs.appendChild(divImagePropertyTitle);
    divPicSpecs.appendChild(divImagePropertyCategory);

    FileUpload.appendChild(input);
    FileUpload.appendChild(spanAdd);

    divUpload.appendChild(spanIcon);
    divUpload.appendChild(FileUpload);
    divUpload.appendChild(spanExtensionSize);

    select.appendChild(option);
    select.appendChild(optionObject);
    select.appendChild(optionAppartments);
    select.appendChild(optionHotel);

    form.append(divUpload);
    form.append(divPicSpecs);
    form.append(divImagePropertyCategory);

    return form;
};

/**
 * Display the image preview
 */
function displayImagePreview() {
    const uploadZone = document.querySelector(".image-upload");
    const inputFile = document.querySelector(".input-file");
    const inputTitle = document.querySelector(".image-title");
    const inputCategory = document.querySelector(".image-category");
    const submitButton = document.querySelector(".valid-btn");
    const modal = document.querySelector('.modal');
    //const fileUpload = document.querySelector('.file-upload');
    let formIsOk = false;
    let nodeImageOk = false;

    inputFile.addEventListener('change', event => {

        nodeImageOk = controlImage(event, uploadZone);
        
    });

    // Add a title to an image of a work
    inputTitle.addEventListener('keyup', event => {
        let nodeTitle = event.target
       
        if (nodeTitle.textLength === 0) {
            alert('Veuillez entrer un nom valide...');
        };
    });

    //Add a category to an image of a work
    inputCategory.addEventListener('change', event => {

        let nodeCategory = event.target;

        if (nodeCategory.value === '') {
            
            alert('Veuillez choisir une catégorie...');
        };
    });

    // Event change
    modal.addEventListener('change', event => {
        
        formIsOk = controlForm(inputFile, inputTitle, inputCategory, submitButton, nodeImageOk);

    });

    // Event keyup
    modal.addEventListener('keyup', event => {
          
        formIsOk = controlForm(inputFile, inputTitle, inputCategory, submitButton, nodeImageOk);

    });
    // Submit image to upload it
    submitButton.addEventListener('click', event => {

        if (formIsOk) {

            uploadNewWork(nodeImageOk);

        }

        else {

            alert('Complétez le formulaire correctement')

        }
    });
};


function controlImage(event, uploadZone) {
    
    let nodeImage = event.target.files;
    
    if (
        nodeImage.length > 0 &&
        nodeImage[0].type === 'image/png' ||
        nodeImage[0].type === 'image/jpeg' &&
        nodeImage[0].size <= '32000000') {

        //fileUpload.classList.add('active');
        let img = document.createElement("img");
        img.src = URL.createObjectURL(nodeImage[0]);
        img.classList.add("upload-img");
        

        uploadZone.appendChild(img);

        return nodeImage;
    };

    alert('Image non valide');

    return false;
};

function controlForm(inputFile, inputTitle, inputCategory, submitButton, imgIsOk) {

    if (imgIsOk &&
        inputFile.value != "" &&
        inputTitle.textLength > 0 &&
        inputCategory.value != "") {

        submitButton.classList.add("active-button");

        return true;

    }

    submitButton.classList.remove("active-button");

    return false;

}

/**
 * 
 * Create a form Data of a work and make an HTTP POST request for uploadind a work
 * 
 * @param image, an image you need to upload 
 */
async function uploadNewWork(image) {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body')
    const uploadImg = document.querySelector('.upload-img');

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', uploadImg.alt);
    formData.append('category', uploadImg.dataset.category);

    console.log(formData);


    const uploadNewWork = await httpPostImage(url_works, store.STORE_TOKEN, formData);
    if (uploadNewWork) {

        alert('Envoyé !')

        body.removeChild(modalBackdrop);
        body.removeChild(modal);
        modalPreviewUpload();
        displayImagePreview();
        arrowBack();

    } else {

        alert('Une erreur s\'est produite...');

        
        body.removeChild(modalBackdrop);
        body.removeChild(modal);
        modalPreviewUpload();
        displayImagePreview();
        arrowBack();

    };
};


function displayUploadModal() {
    const addBtn = document.querySelector('.add-btn');
    const body = document.querySelector('body');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');
            
    body.removeChild(modal);
    body.removeChild(modalBackdrop);
            
    modalPreviewUpload();
    formUpload();
    arrowBack();
    closeModal();
    displayImagePreview();        
    
};