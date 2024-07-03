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
        modalHeader.textContent = header.textContent;


   
    let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        
          
       
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
function ModalPreviewContent() {
    
    const header = document.createElement('div');
    header.textContent = 'Gallery Photo';
    
    const content = document.createElement('div');
     
    
    const footer = document.createElement('button');
    footer.classList.add('add-btn');
    footer.textContent = 'Ajouter photo';

    createModal(header, content, footer);
}

/**
 * 
 * Fill the preview gallery with work
 * 
 * @param Object work, a work from works 
 */
function previewGallery(work) {

    const modalContent = document.querySelector('.modal-content');
    
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
        
        modalContent.append(figure);

        //Delete a work from gallery/Preview Gallery
        spanTrash.addEventListener("click", event => {
        deletedWork(work.id);
        });
};

function fillPreviewGallery(works) {
    
    works.forEach(work => previewGallery(work))
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

       body.removeChild(modalBackdrop);
       body.removeChild(modal)

    });

    closeBtn.addEventListener('click', event => {
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