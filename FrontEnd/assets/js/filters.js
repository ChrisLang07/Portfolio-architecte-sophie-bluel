"use strict"

const node_filters = document.querySelector("[rel=js-filters]");

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
}