"use strict"

const navStatus = document.querySelector("[rel=js-status]");

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
