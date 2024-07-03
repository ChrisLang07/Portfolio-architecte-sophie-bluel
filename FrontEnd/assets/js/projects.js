"use strict"

const node_gallery = document.querySelector("[rel=js-gallery]");
const node_filters = document.querySelector("[rel=js-filters]");


let works = [];
let categories = [];

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
    figure.classList.add('figure-work')
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

/**
 * Reset the .gallery elements
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


function removeFilters() {
node_filters.innerHTML = "";
};

