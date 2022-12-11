import { html } from '../lib.js';

let addCommentsTemp = (comments) => html`
<div class="details-comments">
    <h2>Comments:</h2>
   ${comments.length == 0 ? 
    html`<p class="no-comment">No comments.</p>`
    : commentsList(commentCard)}
</div>`;

let commentsList = (comments) => html`
<ul>
${comments.map(commentCard)}
</ul>`;

let commentCard = (comment) => html`
<li class="comment">
<p>Content: ${comment.comment}.</p>
</li>`;

export function commentsView(gameId) {
    let comments = getCommentsByGameId(gameId);
    return addCommentsTemp(comments);
}