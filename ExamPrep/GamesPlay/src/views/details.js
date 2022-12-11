
import { addComments, deleteGame, getCommentsByGameId, getGameById } from '../api/games.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

let detailsTemplate = (game,userData, isOwner, onDelete,comments, onComments) => html`<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src="${game.imageUrl}" />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
    </div>

    <p class="text">
        ${game.summary}
    </p>
    <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length > 0 
            ? comments.map(commentCard)
            : html`<p class="no-comment">No comments.</p>`}
        </div>

    ${isOwner ? html`<div class="buttons">
    <a href="/edit/${game._id}" class="button">Edit</a>
    <a @click=${onDelete} href="/" class="button">Delete</a>
</div>` : ''}

${userData && userData?._id !== isOwner
    ? html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComments} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>
    `
    : null}

   
</div>
</section>`;

let commentCard = (comment) => html`
<ul>
<li class="comment">
    <p>Content: ${comment.comment}.</p>
</li>
</ul>`;

export async function detailView(ctx) {
    let game = await getGameById(ctx.params.id);
    let userData = getUserData();
    let isOwner = userData?.id == game._ownerId;

   let comments = await getCommentsByGameId(ctx.params.id);
   
    ctx.render(detailsTemplate(game, userData, isOwner,onDelete,comments, onComments));

        async function onDelete() {
        let choice = confirm('Are you sure you want to delete game?');

        if(choice) {
            await deleteGame(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
    async function onComments(event) {
        event.preventDefault();

        let {comment} = Object.fromEntries(new FormData(event.target));
        await addComments({gameId: game._id, comment})

        event.target.reset();
        ctx.page.redirect(`/details/${game._id}`)
}
    
}