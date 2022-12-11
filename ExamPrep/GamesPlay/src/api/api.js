import { clearUserData, getUserData } from "../util.js";

let host = 'http://localhost:3030';

async function request(url, method, data) {

    let options = {
        method,
        headers: {}
    };

    let userData = getUserData();
    if(userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    if(data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    try {
        let response = await fetch(host + url, options);

        if (response.ok == false) {
            if (response.status == 403) {
                clearUserData();
            }
            let error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export async function get(url) {
    return request(url, 'GET');
}

export async function post(url, data) {
    return request(url,'POST',data);
}

export async function put(url, data) {
    return request(url, 'PUT', data);
}

export async function del(url) {
    return request(url, 'DELETE');
}