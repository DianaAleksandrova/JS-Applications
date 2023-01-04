import { getAllProducts } from '../api/products.js';
import { html } from '../lib.js';

let catalogTemplate = (products) => html`
<h2>Products</h2>
<section id="dashboard">
 ${products.length == 0 
    ? html`<h2>No products yet.</h2>`
    : products.map(catalogCard)}
    </section>`;
 
 let catalogCard = (product) => html`
 <div class="product">
 <img src="${product.imageUrl}" alt="example1" />
 <p class="title">${product.name}</p>
 <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
 <a class="details-btn" href="/details/${product._id}">Details</a>
</div>`;

export async function catalogView(ctx) {
    let products = await getAllProducts(ctx.params.id);
    ctx.render(catalogTemplate(products));


}