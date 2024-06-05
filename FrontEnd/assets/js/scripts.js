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

async function workList() {
    const works = await httpGet(url_works);

    node_gallery.innerHTML = "";

    works.forEach(element => {

        console.log(element);

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

async function categories() {
    const categories = await httpGet(url_categories);

    categories.forEach(element => {

        console.log(element);
    })
}

async function filter(id) {
    const filter = await httpGet(url_works);
    
    node_gallery.innerHTML = "";
    
    filter.forEach(element => {
        if(element.categoryId === id) {
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

workList();

const filterAll = document.querySelector(".all");
console.log(filterAll);
filterAll.addEventListener("click", function() {
    workList();
});

const filterObjects = document.querySelector(".objects");
console.log(filterObjects);
filterObjects.addEventListener("click", function() {
    filter(1);
});

const filterAppartment = document.querySelector(".appartments");
console.log(filterAppartment);
filterAppartment.addEventListener("click", function() {
    filter(2);
});

const filterHotel = document.querySelector(".hotel");
console.log(filterAll);
filterHotel.addEventListener("click", function() {
    filter(3);
});
