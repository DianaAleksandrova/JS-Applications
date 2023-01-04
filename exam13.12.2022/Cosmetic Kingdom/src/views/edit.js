import { getProductDetails, updateProduct } from '../api/products.js';
import { html } from '../lib.js';

let editTemplate = (product, onEdit) => html`
<section id="edit">
<div class="form">
  <h2>Edit Product</h2>
  <form @submit=${onEdit} class="edit-form">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Product Name"
      .value=${product.name}
    />
    <input
      type="text"
      name="imageUrl"
      id="product-image"
      placeholder="Product Image"
      .value=${product.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="product-category"
      placeholder="Category"
      .value=${product.category}
    />
    <textarea
      id="product-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
      .value=${product.description}
    ></textarea>
    
    <input
      type="text"
      name="price"
      id="product-price"
      placeholder="Price"
      .value=${product.price}
    />
    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function editView(ctx) {
    let product = await getProductDetails(ctx.params.id);
    ctx.render(editTemplate(product, onEdit));

    async function onEdit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let product = {
            name: formData.get('name'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            price: formData.get('price')
        };

        if(product.name == '' || product.imageUrl == '' || product.category == '' 
        || product.description == '' || product.price == '') {
            return alert('All fields are required!');
        }

        await updateProduct(ctx.params.id, product);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}
