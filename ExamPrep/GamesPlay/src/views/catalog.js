import { getAllGames } from '../api/games.js';
import { html } from '../lib.js';

let catalogTemplate = (games) => html`
<section id="catalog-page">
<h1>All Games</h1>
<!-- Display div: with information about every game (if any) -->

    ${games.length == 0 ? html`<h3 class="no-articles">No articles yet</h3>`
    : games.map(catalogCard)}

    

</section>`;

let catalogCard = (game) => html`
<div class="allGames">
<div class="allGames-info">
<img src="${game.imageUrl}">
<h6>${game.category}</h6>
<h2>${game.title}</h2>
<a href="/details/${game._id}" class="details-button">Details</a>
</div>
</div>`;

export async function catalogView(ctx) {
    let games = await getAllGames();
    ctx.render(catalogTemplate(games));
}