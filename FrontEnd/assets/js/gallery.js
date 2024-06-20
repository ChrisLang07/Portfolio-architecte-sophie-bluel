"use strict"

const node_gallery = document.querySelector("[rel=js-gallery]");


/**
 * Reset the .gallery elements
 */
function resetGallery() {
    node_gallery.innerHTML = "";
}

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
    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.dataset.category = work.id;
    
    node_gallery.appendChild(figure);
};

/**
 * Add works on .gallery
 * 
 * @params Array works
 */
function fillGallery(works) {
    resetGallery();
    works.forEach(work => createWork(work));
};



