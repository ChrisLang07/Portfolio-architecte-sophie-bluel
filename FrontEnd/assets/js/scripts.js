"use strict"

const url_works = "http://localhost:5678/api/works";
const url_categories = "http://localhost:5678/api/categories";

const node_gallery = document.querySelector("[rel=js-gallery]");
const node_filters = document.querySelector("[rel=js-filters]");

let works = [];
let categories = [];

/**
 *
 * Make a HTTP request and return an array
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
        alert("HTTP Error ! : " + response.status)
        return [];
    }
};

/**
data, Data you nedd to pass to the request 
 * @param Object headers, the HTTP request headers options 
 * 
 */

async function httpPost(url, data, headers) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data,
            headers: headers
        });
        return await response.json();
    }
    catch (error) {
        alert("HTTP Error : " + response.status)
        return [];
    }
};

/**
 * Reset the .gallery element
 */
function resetGallery() {
    node_gallery.innerHTML = "";
};

/**
 * 
 * Create the HTML of work
 * 
 * @param Object work, a work data 
 */

function createWork(work) {
    
    let figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;

    let img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
    
    let figure = document.createElement("figure");
        figure.appendChild(img);
        figure.appendChild(figcaption);

    node_gallery.appendChild(figure);
};

/**
 * 
 * create the works of a category
 * 
 * @param category, the category of a work 
 */

function createFilters(category) {
    
    let li = document.createElement('li');
    li.classList.add("filter-tag");
    li.textContent = category.name;
    li.dataset.category = category.id;
    
    li.addEventListener('click', event => {
        
        let node = event.target;
        console.log(node);
        let categoryId = node.dataset.category;
        let filteredWorks = works.filter(work => work.categoryId == categoryId);
        categoryId == 0? fillGallery(works) : fillGallery(filteredWorks);
        
    });
    
    node_filters.appendChild(li);
};

function fillFilters(categories) {
    categories.forEach(category => createFilters(category)); 
    
};      

/**
 * 
 * Add works on .gallery
 * 
 * @param array works 
 */

function fillGallery(works) {
    resetGallery();
    works.forEach(work => createWork(work));
};

(async () => {
    // Get data
    works = await httpGet(url_works);
    categories = await httpGet(url_categories);
    
    createFilters({id: 0, name: 'Tous'});
    fillFilters(categories);
    
    fillGallery(works);
    
})();





