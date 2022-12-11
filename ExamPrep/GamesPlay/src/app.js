
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { logout } from './api/users.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { detailView } from './views/details.js';

let root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/',homeView);
page('/catalog',catalogView);
page('/login',loginView);
page('/register', registerView);
page('/create',createView);
page('/details/:id',detailView);
page('/edit/:id',editView);
updateNavigation();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNavigation = updateNavigation;
    next();
}

function renderMain(content) {
    render(content, root);
}

function updateNavigation() {
    let userData = getUserData();

    if(userData) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    }else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNavigation();
    page.redirect('/');
}
