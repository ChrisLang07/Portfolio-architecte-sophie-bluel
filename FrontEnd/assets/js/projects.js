"use strict"

const node_gallery = document.querySelector("[rel=js-gallery]");
const node_filters = document.querySelector("[rel=js-filters]");
let works = [];
let categories = [];

/**
 * Get works and categories to fill gallery
 * 
 */
(async () => {

    // Get data
    categories = await httpGet(url_categories);
    works = await httpGet(url_works);

    // Create Categories
    createFilter({ id: 0, name: 'Tous' });
    categories.forEach(category => createFilter(category));


    // Create Works
    fillGallery(works);
    resetActiveFilter(0);

    if (!store.length == 0) {
        removeFilters()
        createAdminMenu();
        login();
     };
})();

/**
 * 
 * Fill the preview gallery with work
 * 
 * @param Object work, a work from works 
 * 
 * @returns HTML element 
 * 
 */
function previewGallery(previewWork) {
    let spanTrash = document.createElement("span");
        spanTrash.classList.add("material-symbols-outlined");
        spanTrash.setAttribute("rel", "js-trash");
        spanTrash.setAttribute("id", "trash");
        spanTrash.textContent = "delete";
        spanTrash.dataset.category = previewWork.dataset.category;

    let img = document.createElement('img');
        img.classList.add('preview-img');
        img.src = previewWork.firstChild.src;
        img.alt = previewWork.textContent
        

    let figure = document.createElement('figure');
        figure.classList.add('preview');
        figure.dataset.category = previewWork.dataset.category

        figure.append(spanTrash);
        figure.append(img);

        spanTrash.addEventListener("click", event => {
            let buttonOui = document.createElement('button');
                buttonOui.textContent = 'Oui';
                buttonOui.addEventListener('click', event => {
                    
                    deletedWork(previewWork.dataset.category);
                    
                });
            let buttonNon = document.createElement('button');
                buttonNon.textContent = 'Non';
            
            modalAlertMessage('Confirmez vous la suppression du projet ?', buttonOui, buttonNon);           
        });

    return figure;
};

/**
 * 
 * Create content of the preview gallery
 * 
 */
function fillPreviewGallery() {
    const figureContent = document.createElement('div');
    const previewWorks = node_gallery.childNodes
    
    previewWorks.forEach(previewWork  => {
        let preview = previewGallery(previewWork);
            figureContent.classList.add('content');
            figureContent.append(preview);
    })
    
    return figureContent;
};

/**
 * Create the HTML of a work
 * 
 * @param Object work, a work data
 */
function createWork(work) {
    let figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title

    let img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title

    let figure = document.createElement("figure");
        figure.classList.add('work')
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.dataset.category = work.id;
    
        node_gallery.appendChild(figure);
};

/**
 * Add works to gallery
 * 
 * @params Array works
 */
function fillGallery(works) {
    resetGallery();
    works.forEach(work => createWork(work));
};

/**
 * Delete a work from works and update gallery/Preview Gallery
 */
async function deletedWork(id) {

    const deletedWork = await httpDelete(url_deleteWork + id, store.STORE_TOKEN);
    const previewContent = document.querySelector('.content');

    let figure = node_gallery.querySelector('[data-category="' + id + '"]');
    let previewToDel = previewContent.querySelector('[data-category="' + id + '"]');

    if (deletedWork) {

        node_gallery.removeChild(figure);
        previewContent.removeChild(previewToDel);
        
        let buttonOk = document.createElement('button');
            buttonOk.textContent = 'Ok';
        modalAlertMessage('Effacé !', null, buttonOk);
    };
};

/**
 * Reset the gallery elements
 */
function resetGallery() {
    node_gallery.innerHTML = "";
}

/**
 * 
 * Create a filter bar
 * 
 * @param filter, a filter to sort works
 */
function createFilter(filter) {
    let li = document.createElement('li');
        li.classList.add('filter-tag');
        li.dataset.category = filter.id;
        li.textContent = filter.name;

        li.addEventListener('click', event => {

        let node = event.target;
        let categoryId = node.dataset.category;
        let filteredWorks = works;
        
        resetActiveFilter(categoryId);

        if (categoryId != 0) {
            filteredWorks = works.filter(work => work.categoryId == categoryId);
        }

        fillGallery(filteredWorks);
    });
    
    node_filters.append(li);
};

function resetActiveFilter(activeId) {

    const filters = document.querySelectorAll('.filter-tag');

    filters.forEach(filter => filter.classList.remove('active'));

    filters.forEach(filter => {
        if (filter.dataset.category == activeId) {
            filter.classList.add('active')
        }
    })
};

/**
 * Remove filters from main page of works
 */
function removeFilters() {
node_filters.innerHTML = "";
};

/**
 * 
 * Make an upload of a work
 * 
 * @param , formData, image data you need to upload 
 */
async function uploadNewWork(formData) {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body')
    const uploadNewWork = await httpPostImage(url_works, store.STORE_TOKEN, formData);
   
       
    if (uploadNewWork) {
        // Create an alert message for successfully upload
        let buttonOk = document.createElement('button');
            buttonOk.textContent = 'Ok';
        modalAlertMessage('Succès !', null, buttonOk);
        
        // Add the upload work to works
        updateWorks(uploadNewWork);
        
        // Reset the upload form
        resetUploadForm(body, modalBackdrop, modal);
        
    } else {
        
        // Create an alert message when an error is occur
        let buttonOk = document.createElement('button');
            buttonOk.textContent = 'Ok';
        modalAlertMessage('Une erreur s\'est produite !', null, buttonOk);
        
        // Reset the upload form
        resetUploadForm(body, modalBackdrop, modal);
    };
};

/**
 * 
 * Update gallery of works after uploading a new work
 * 
 * @param Object uploadNewWork, the new work you need to upload
 */
function updateWorks(uploadNewWork) {
    
    const node_gallery = document.querySelector('[rel=js-gallery]');
    
    let img = document.createElement('img');
        img.src = uploadNewWork.imageUrl;
        img.alt = uploadNewWork.title;

    let figcaption = document.createElement('figcaption');
        figcaption.textContent = uploadNewWork.title;

    let figure = document.createElement('figure');
        figure.classList.add('work');
        figure.dataset.category = uploadNewWork.id;

        figure.append(img);
        figure.append(figcaption);
        node_gallery.append(figure);
};