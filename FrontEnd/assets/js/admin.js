"use strict"

const menuAdmin = document.querySelector("[rel=js-projects]");


/**
 * Create admin menu
 */
function adminMenu() {

       let menuLink = document.createElement("a");
        menuLink.setAttribute("href","#modal");
        menuLink.classList.add("modal-link");
        
    let menuIcon = document.createElement("span");
        menuIcon.classList.add("material-symbols-outlined");
        menuIcon.textContent = "edit_square";

    let ediText = document.createElement("span");
        ediText.classList.add("edit");
        ediText.textContent = "modifier";

    let adminZone = document.createElement("div");
        adminZone.classList.add("admin-menu");

        menuLink.appendChild(ediText);
        adminZone.appendChild(menuIcon);
        adminZone.appendChild(menuLink);

        menuAdmin.appendChild(adminZone);
        
        createModal();
};



