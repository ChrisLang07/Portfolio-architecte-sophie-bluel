"use strict"

const url_login = "http://localhost:5678/api/users/login";
const auth = document.querySelector("[name=authentification]");
const email = document.querySelector('email');
const password = document.querySelector('password');
const navStatus = document.querySelector("[rel=js-status]");
let store = sessionStorage;

/**
 * Triggers the submit button event
 */
auth?.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const data = {
        email: auth.email.value,
        password: auth.password.value,
    };

    const headers = { "Content-Type": "application/json"};

    const response = await httpPostJson(url_login, data, headers);

    if (!response.userId) {
       
        const errorMessage = "Mauvais E-mail et/ou mot de passe !";
        modalAlertMessage(errorMessage);
        return;
    };

    if (response.token) {
        store.setItem("STORE_TOKEN", response.token);
        window.location = 'index.html';
        return;
    };
});

/**
 * Create an alert message
 * 
 * @param String myMessage, the message displayed
 */

function modalAlertMessage(myMessage) {
    const main = document.querySelector('main');

    let span = document.createElement("span");
    span.textContent = myMessage;

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("validation");
    button.textContent = "Ok";

    let div = document.createElement("div");
    div.classList.add("zone-alert");
    div.style.display = "flex";

    div.appendChild(span);
    div.appendChild(button);

    main.appendChild(div);
    
    button.addEventListener("click", event => {
        
        main.removeChild(div);
    });
};

/**
 * Create admin menu
 */
function createAdminMenu() {
    const headlineTitle = document.querySelector(".headline-title");

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

        headlineTitle.appendChild(adminZone);

        menuLink.addEventListener('click', event => {
            
            modalPreviewContent();
        }); 
    };

function logout() {
    store.removeItem("STORE_TOKEN");  
    window.location = 'index.html';
    
};

function login() {
    let token = store.getItem("STORE_TOKEN");
    token = token.trim();

    if (token.length) {
        navStatus.textContent = "logout";
        navStatus.addEventListener("click", event => {
            event.preventDefault();
            logout();
        });
    };
};



