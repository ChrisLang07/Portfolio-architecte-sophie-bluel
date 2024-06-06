"use strict"

const url_works = "http://localhost:5678/api/works";
const url_categories = "http://localhost:5678/api/categories";

const node_gallery = document.querySelector("[rel=js-gallery]");

async function httpGet(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    catch (error) {
        alert('HTTP Error ! :' + response.status);
    }
}

// Affichage de tous les projets //

async function workList() {
    const works = await httpGet(url_works);

    node_gallery.innerHTML = "";

    works.forEach(element => {

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = element.title

        const img = document.createElement("img");
        img.src = element.imageUrl;
        img.alt = element.title

        const figure = document.createElement("figure");
        figure.appendChild(img);
        figure.appendChild(figcaption);

        node_gallery.appendChild(figure);

    })
}

workList();

// Filtrage des projets par catégories //

async function filter(id) {
    const filter = await httpGet(url_works);
    
    node_gallery.innerHTML = "";
    
    filter.forEach(element => {
        const category = element.category; 
        const monSet = new Set();
        monSet.add(category.name);
        console.log(monSet);
        if(monSet.has(id)) {
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = element.title;
    
            const img = document.createElement("img");
            img.src = element.imageUrl;
            img.alt = element.title
    
            const figure = document.createElement("figure");
            figure.appendChild(img);
            figure.appendChild(figcaption);
    
            node_gallery.appendChild(figure);
        }
    })
}




const filterAll = document.querySelector(".all");
filterAll.addEventListener("click", function() {
    workList();
});

const filterObjects = document.querySelector(".objects");
filterObjects.addEventListener("click", function() {
    filter("Objets");
});

const filterAppartment = document.querySelector(".appartments");
filterAppartment.addEventListener("click", function() {
    filter("Appartements");
});

const filterHotel = document.querySelector(".hotel");
filterHotel.addEventListener("click", function() {
    filter("Hotels & restaurants");
});


