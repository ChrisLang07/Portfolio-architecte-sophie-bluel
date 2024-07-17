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
        let buttonOk = document.createElement('button');
        buttonOk.textContent = 'Ok';
        modalAlertMessage("Mauvais E-mail et/ou mot de passe !", buttonOk);
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
function modalAlertMessage(myMessage, buttonOne, buttonTwo) {
    const main = document.querySelector('main');

    let span = document.createElement('span');
        span.textContent = myMessage;

    let divButtons = document.createElement('div');
        divButtons.classList.add('action-buttons');

    let divZoneAlert = document.createElement('div');
        divZoneAlert.classList.add('zone-alert');
        divZoneAlert.style.display = 'flex';

    if (buttonOne) {
        buttonOne.setAttribute('type', 'button');
        buttonOne.classList.add('validation')

        divButtons.appendChild(buttonOne);

        buttonOne.addEventListener('click', event => {
            
            main.removeChild(divZoneAlert);
        })
        
    };

    if (buttonTwo) {
        buttonTwo.setAttribute('type', 'button');
        buttonTwo.classList.add('validation')

        divButtons.appendChild(buttonTwo);

        buttonTwo.addEventListener('click', event => {
                    
            main.removeChild(divZoneAlert);
        });
    };      

    
    divZoneAlert.appendChild(span);
    divZoneAlert.appendChild(divButtons);
    main.appendChild(divZoneAlert);
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



