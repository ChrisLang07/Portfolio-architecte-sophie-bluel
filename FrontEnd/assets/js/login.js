"use strict"

const url_login = "http://localhost:5678/api/users/login";

let form = document.querySelector('form');
let email = document.querySelector('email');
let password = document.querySelector('password');


/**
 * Make a HTTP POST Request and return an array
 * 
 * @param String url 
 * @param Object data, Data you need to pass to the request
 * @param Object headers, The HTTP request headers options
 */
async function httpPost(url, data, headers) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data,
            headers: headers
        });
        return await response.json();
    }
    catch (error) {
        alert("HTTP Error : " + response.status)
        return [];
    }
};

function accessAuth(login, storage) {
    if (login.error) {
        alert("Wrong Email and/or Password");
        storage.clear();
    } else {
        storeToken(login, storage);
    };
};

/**
 * 
 * Stores the token in the session storage
 * 
 * @param Object login, to get token 
 * @param Object sessionStorage, where is store token
 */
function storeToken(login, sessionStorage) {
    sessionStorage.setItem("token", login.token);
};

/**
 * 
 * Redirects to the homepage
 * 
 * @param sessionStorage, where the token is store
 */
function accessMainPage(sessionStorage) {
    if (sessionStorage.token != undefined) {
        window.location = "index.html";
    };
};

/**
 * 
 * @param String url 
 * @param Object data, data you need to pass the request 
 * @param  Object headers, the HTTP request headers options
 */
async function login(url, data, headers) {
    // Post data
    const login = await httpPost(url, data, headers);

    accessAuth(login, sessionStorage);
    accessMainPage(sessionStorage);  
};


/**
 * Triggers the submit button event
 */
form.addEventListener("submit", event => {
    event.preventDefault();

    let nodeEmail = event.target.email;
    let nodePassword = event.target.password;
    let data = JSON.stringify({
        email: nodeEmail.value,
        password: nodePassword.value
    });

    let headers = { "Content-Type": "application/json", };

    login(url_login, data, headers);
});












