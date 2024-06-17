"use strict"

const url_login = "http://localhost:5678/api/users/login";

const auth = document.querySelector("[name=authentification]");
const email = document.querySelector('email');
const password = document.querySelector('password');
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

    const headers = { "Content-Type": "application/json", };

    const response = await httpPostJson(url_login, data, headers);

    if (!response.userId) {
        modalAlertMessage();
        return;
    };

    if (response.token) {
        store.setItem("STORE_TOKEN", response.token);
        window.location = 'index.html';
        return;
    };

    
});






