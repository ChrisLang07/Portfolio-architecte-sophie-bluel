"use strict"

const loginState = document.querySelector("[rel=js-status]");


/**
 *
 * Display the user login status
 *  
 * @param Object sessionStorage, where the token is stored
 */
function loginStatus(sessionStorage) {
    if (sessionStorage.token !== undefined) {
        loginState.textContent = "logout";
    };
};

/**
 * Redirects to the login page after a logout
 */
loginState.addEventListener('click', () => {
    sessionStorage.clear();
    window.location = "login.html";
});

loginStatus(sessionStorage);



