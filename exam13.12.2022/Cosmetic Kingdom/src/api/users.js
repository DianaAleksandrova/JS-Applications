import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

export async function login(email, password) {
    let result = await post('/users/login', {email, password});

    let userData = {
        id: result._id,
        email: result.email,
        password: result.password,
        accessToken: result.accessToken
    };

    setUserData(userData);
    return result;
}

export async function register( email, password) {
    let result = await post('/users/register', { email, password});

    let userData = {
        id: result._id,
        email: result.email,
        accessToken: result.accessToken
    };

    setUserData(userData);
    return result;
}

export function logout() {
    get('/users/logout');
    clearUserData();
}