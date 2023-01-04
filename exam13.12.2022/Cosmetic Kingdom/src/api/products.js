import { del, get, post, put } from "./api.js";


export async function getAllProducts() {
    return get('/data/products?sortBy=_createdOn%20desc');
}

export async function addProduct(product) {
    return post('/data/products', product);
}

export async function getProductDetails(id) {
    return get('/data/products/' + id);
}

export async function updateProduct(id, product) {
    return put('/data/products/' + id, product);
}

export async function deleteProduct(id) {
    return del('/data/products/' + id);
}

export async function buy(productId) {
    return post('/data/bought',productId);
}

export async function getBuy(productId) {
    return get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`)
}

export async function getUserBuy(productId, userId) {
    return get(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}