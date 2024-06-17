"use strict"

const url_works = "http://localhost:5678/api/works";
const url_categories = "http://localhost:5678/api/categories";
const url_delete = "http://localhost:5678/api/works/{id}";

/**
 * Make a HTTP GET Request and return an array
 * 
 * @param String url 
 * @returns Array
 */
async function httpGet(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch (error) {
        alert('HTTP Error ! :' + response.status);
        return [];
    }
}

/**
 * Make a HTTP POST Request and return an array
 * 
 * @param String url 
 * @param Object data, Data you need to pass the request
 * @param Object headers, The HTTP request headers options
 */
async function httpPostJson(url, data, headers) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        });
        return await response.json();
    }
    catch (error) {
        alert('HTTP Error ! :' + response.status);
        return [];
    }
}

/**
 * 
 * Make a HTTP DELETE Request
 * 
 * @param String url 
 * @param Object headers, the HTTP request headers options 
 * 
 */
async function httpDelete(url, headers) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers : headers
        });
        return await response.json();
    }
    catch (error) {
        alert("HTTP Error : " + response.status)
        return [];
    }
};



