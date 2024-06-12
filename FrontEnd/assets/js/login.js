const url_login = "http://localhost:5678/api/users/login";

let form = document.querySelector('form');
let email = document.querySelector('email');
let password = document.querySelector('password');
const loginState = document.querySelector("[rel=js-status]");

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

function storeToken(login, storage) {
    storage.setItem("token", login.token);
};

function accessMainPage(storage) {
    if (storage.token != undefined) {
        window.location = "index.html";
    };
};

function loginStatus(storage) {
    if (storage.token !== undefined) {
        loginState.textContent = "logout";
    };
};



async function login(url, data, headers) {
    // Post data
    const login = await httpPost(url, data, headers);
    const storage = sessionStorage;

    accessAuth(login, storage);
    accessMainPage(storage);
    
};

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

loginStatus(sessionStorage);


loginState.addEventListener('click', () => {
    sessionStorage.clear();
    window.location = "login.html";
    
    
});











