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


async function login(url, data, headers) {
    const login = await httpPost(url, data, headers);
    console.log(login);
    if(login.error) {
        alert("Wrong Email and/or Password");
    } else {
        let storage = window.localStorage;
        storage.setItem("token", login.token);       
        window.location = "index.html";
    }

};

form.addEventListener("submit", event => {
    event.preventDefault();

    let nodeEmail = event.target.email;
    let nodePassword = event.target.password;
    let data = JSON.stringify({
        email: nodeEmail.value,
        password: nodePassword.value
    });
    
    let headers = {"Content-Type": "application/json",};
    
    login(url_login, data, headers);
    
});



