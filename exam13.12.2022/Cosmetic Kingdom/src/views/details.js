import { buy, deleteProduct, getBuy, getProductDetails, getUserBuy } from '../api/products.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

let detailsTemplate = (product, userData, onDelete, buyCount, hasBuy, onBuy) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${product.imageUrl}" />
  <p id="details-title">${product.name}</p>
  <p id="details-category">
    Category: <span id="categories">${product.category}</span>
  </p>
  <p id="details-price">
    Price: <span id="price-number">${product.price}</span>$</p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Bought: <span id="buys">${buyCount}</span> times.</h4>
      <span
        >${product.description}</span>
    </div>
  </div>
    ${userData ?
    html`
    <div id="action-buttons">
    ${userData?.id == product._ownerId
        ? html`
        <a href="/edit/${product._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
        : hasBuy ? nothing
          : html`<a @click=${onBuy} href="javascriptVoid(0)" id="buy-btn">Buy</a>`}
        
    </div>`
    : nothing}
</div>
</section>`;

export async function detailsView(ctx) {
  let productId = ctx.params.id;
  let userData = getUserData();

  let requests = await Promise.all([
    getProductDetails(productId),
    getBuy(productId),
    userData && getUserBuy(productId, userData.id)
  ]);

  let product = requests[0];
  let buyCount = requests[1];
  let hasBuy = requests[2];

  ctx.render(detailsTemplate(product, userData, onDelete, buyCount, hasBuy, onBuy));

  async function onDelete() {
    let choice = confirm('Are you sure you want to delete this product?');

    if (choice) {
      await deleteProduct(ctx.params.id);
      ctx.page.redirect('/catalog');
    }
  }
  async function onBuy(event) {
    event.target.style.display = 'none';
    document.getElementById('buys').textContent = `${buyCount + 1}`;
    await buy(ctx.params.id);
    ctx.page.redirect(`/details/${productId}`);
  }


}