"use strict"

const url_works = "http://localhost:5678/api/works";
const url_categories = "http://localhost:5678/api/categories";

const node_gallery = document.querySelector("[rel=js-gallery]");
const node_filters = document.querySelector("[rel=js-filters]");

let works = [];

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
        alert('HTTP Error ! :' + response.status);
        return [];
    }
}

/**
 * Make a HTTP POST Request and return an array
 * 
 * @param String url 
 * @param Object data, Data you need to pass the request
 * @param Object headers, The HTTP request headers options
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
        alert('HTTP Error ! :' + response.status);
        return [];
    }
}

/**
 * Reset the .gallery elements
 */
function resetGallery() {
    node_gallery.innerHTML = "";
}

/**
 * Add works on .gallery
 * 
 * @params Array works
 */
function fillGallery(works) {
    resetGallery();
    works.forEach(work => createWork(work));
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

    node_gallery.appendChild(figure);
};


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
    loggedAdmin();
};


/**
 * Create admin menu
 */
function adminMenu() {
    const projecTitle = document.querySelector("[rel=js-filters]", "h2");

    let menuLink = document.createElement("a");
        menuLink.setAttribute("href","#modal");
        menuLink.classList.add("modal-link");
        
        
    
    let menuIcon = document.createElement("span");
        menuIcon.classList.add("material-symbols-outlined");
        menuIcon.textContent = "edit_square";

    let menu = document.createElement("span");
        menu.classList.add("edit");
        menu.textContent = "modifier";

    let adminMenu = document.createElement("div");
        adminMenu.classList.add("admin-menu");

        menuLink.appendChild(menu);
        adminMenu.appendChild(menuIcon);
        adminMenu.appendChild(menuLink);
        projecTitle.appendChild(adminMenu);

};

/**
 * Remove filters when admin is logged
 */
function removeFilters() {
    node_filters.innerHTML = "";
};

/**
 * Display admin menu
 */
function loggedAdmin() {
    if (sessionStorage.token) {
        removeFilters();
        adminMenu();
        openModal();
        closeModal();
    }
};

function resetActiveFilter(activeId) {
    const filters = node_filters.querySelectorAll('.filter-tag');

    filters.forEach(filter => filter.classList.remove('active'));

    filters.forEach(filter => {
        if (filter.dataset.category == activeId) {
            filter.classList.add('active')
        }
    })
};

(async () => {
    // Get Data
    const categories = await httpGet(url_categories);
    works = await httpGet(url_works);

    // Create Categories
    createFilter({ id: 0, name: 'Tous' });
    categories.forEach(category => createFilter(category));

    // Create Works
    fillGallery(works);
    resetActiveFilter(0);
})();

function openModal() {
    let openModal = document.querySelector(".modal-link");
    let darkBackground = document.querySelector(".darkbackground");
    let modal = document.querySelector(".modal");
    
    openModal.addEventListener("click", event => {
        darkBackground.style.display = "flex";
        modal.style.display ="block";
    });
};

function closeModal() {
    let closeModal = document.querySelector("#modal .material-symbols-outlined");
    let darkBackground = document.querySelector(".darkbackground");
    let modal = document.querySelector(".modal");

    closeModal.addEventListener('click', event => {
        darkBackground.style.display = "none";
        modal.style.display ="none";
    });
};



