
let works =[];
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
        adminMenu();
        login();
    };
    
})();

